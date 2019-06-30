import React, {useState} from 'react';
import Suggestions from '../Suggestions/Suggestions';

import './SearchField.scss';

const data = [
    {
      "id": "123-s2-546",
      "name": "John Jacobs",
      "items": ["bucket", "bottle"],
      "address": "1st Cross, 9th Main, abc Apartment",
      "pincode": "5xx012"
    },
    {
      "id": "123-s3-146",
      "name": "David Mire",
      "items": ["Bedroom Set"],
      "address": "2nd Cross, BTI Apartment",
      "pincode": "4xx012"
    },
    {
      "id": "223-a1-234",
      "name": "Soloman Marshall",
      "items": ["bottle"],
      "address": "Riverbed Apartment",
      "pincode": "4xx032"
    },
    {
      "id": "121-s2-111",
      "name": "Ricky Beno",
      "items": ["Mobile Set"],
      "address": "Sunshine City",
      "pincode": "5xx072"
    },
    {
      "id": "123-p2-246",
      "name": "Sikander Singh",
      "items": ["Air Conditioner"],
      "address": "Riverbed Apartment",
      "pincode": "4xx032"
    },
    {
      "id": "b23-s2-321",
      "name": "Ross Wheeler",
      "items": ["Mobile"],
      "address": "1st Cross, 9th Main, abc Apartement",
      "pincode": "5xx012"
    },
    {
      "id": "113-n2-563",
      "name": "Ben Bish",
      "items": ["Kitchen Set", "Chair"],
      "address": "Sunshine City",
      "pincode": "5xx072"
    },
    {
      "id": "323-s2-112",
      "name": "John Michael",
      "items": ["Refrigerator"],
      "address": "1st Cross, 9th Main, abc Apartement",
      "pincode": "5xx012"
    },
    {
      "id": "abc-34-122",
      "name": "Jason Jordan",
      "items": ["Mobile"],
      "address": "Riverbed Apartment",
      "pincode": "4xx032"
    }
];

export class SearchField extends React.Component {
    state = {
        searchText: '',
        searchResults: [],
        inputState: '',
        activeSuggestion: 0,
        showSuggestions: false
    }

    inputRef = null;
    parentNode = null;

    componentWillMount = () => {
        document.addEventListener('click', this.handleDocumentClick, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleDocumentClick, false);
    }

    handleDocumentClick = (e) => {
        if (this.parentNode.contains(e.target)) {
            return;
        }

        this.setState({
            inputState: 'blur',
            showSuggestions: false
        })
    }

    getData = (str) => {
        if (!str) {
            this.setState({
                searchResults: []
            })
            return;
        }
        const results = data.filter(e => {
            const matches = [];
            for(let i in e) {
                if (typeof e[i] == 'object' && e[i].constructor === Array) {
                    const found = e[i].filter(v => v.toLocaleLowerCase().includes(str.toLocaleLowerCase())).length;
                    if(found) matches.push(e[i]);
                }
                if (typeof e[i] == 'string') {
                    if(e[i].toLocaleLowerCase().includes(str.toLocaleLowerCase())) matches.push(e[i]);
                }
            }
            return (matches.length);
        })
        this.setState({
            searchResults: results
        });
    }

    handleInputChange = (e) => {
        const val = e.target.value;
        this.setState({
            searchText: val,
            showSuggestions: val.trim() ? true : false 
        });
        this.getData(e.target.value.trim());
    }

    setFocus = () => {
        this.setState({
            inputState: 'focus'
        })
    }

    onSelectItem = (selectedItem) => {
        this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            searchText: selectedItem.name
        });
    }

    onKeyDown = (e) => {
        const active = document.activeElement.parentNode.parentNode.lastChild;
        const activeIndex = document.activeElement.tabIndex;
        const { activeSuggestion, searchResults } = this.state;
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                searchText: searchResults[activeSuggestion].name
            });
        }
        // User pressed the down arrow
        if(e.keyCode === 40) {
            active.childNodes[activeIndex +1] && active.childNodes[activeIndex+1].focus();
            if (activeIndex + 1 !== searchResults.length) {
                this.setState({
                    activeSuggestion: activeIndex + 2
                })
            }
        }
        // User pressed the up arrow
        if (e.keyCode === 38) {
            active.childNodes[activeIndex-1] && active.childNodes[activeIndex-1].focus();    
            if (activeIndex !== 0) {
                this.setState({
                    activeSuggestion: activeIndex
                })
            }
        }
    }

    handleMouseFocus = (index) => {
        const active = document.activeElement.parentNode.parentNode.lastChild;
        active.childNodes[index] && active.childNodes[index].focus();
        this.setState({
            activeSuggestion: document.activeElement.tabIndex + 1
        })
    }

    clearInputText = () => {
        this.setState({
            activeSuggestion: 0,
            searchText: '',
            inputState: 'blur'
        })
    }



    handleInputClick = (e) => {
        this.setState({
            inputState: 'focus',
            showSuggestions: true
        })
        this.getData(e.target.value);
    }

    render = () => {
        const { searchResults, inputState, searchText, activeSuggestion, showSuggestions } = this.state;
        const { placeholder } = this.props;
        return (<div tabIndex="0" ref={(r) => this.parentNode = r} className={`search-wrapper ${inputState}`}>
            <form>
                <i className="zmdi zmdi-search"></i>
                <input 
                    className={`ellipsis ${inputState}`}
                    type="text" 
                    ref= {(r) => this.inputRef = r}
                    value={searchText}
                    onChange={this.handleInputChange}
                    placeholder={placeholder}
                    onFocus={this.setFocus}
                    onKeyDown={this.onKeyDown}
                    onClick={this.handleInputClick}
                />
                <button onClick={this.clearInputText} className={`close-icon zmdi ${!searchText && 'hidden'}`} type="reset"></button>
            </form>
            { 
                showSuggestions && searchText && <Suggestions 
                    activeSuggestion={activeSuggestion - 1} 
                    handleMouseFocus={this.handleMouseFocus}
                    onSelectItem={this.onSelectItem}
                    query={searchText}
                    results={searchResults}
                    handleKeyDown={this.onKeyDown}
                />
            }
        </div>
        );
    }
}


export default SearchField;