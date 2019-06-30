import React from 'react'
import ListCard, { NoDataListCard } from '../ListCard/ListCard';
import './Suggestions.scss';


export class Suggestions extends React.Component {
    render = () => {
        const { query, activeSuggestion, results, onSelectItem, handleMouseFocus } = this.props;
        const options = results.length ? results.map((r, index) => (
            <li tabIndex={index+1} onMouseEnter={() => handleMouseFocus(index)} onMouseLeave={() => handleMouseFocus(index)} key={r.name} onClick={() => onSelectItem(r)} key={r.id}>
                <ListCard query={query} {...r} active={(activeSuggestion === index) ? true : false} />
            </li>
        )): <NoDataListCard />
        return <ul className="suggestions" onKeyDown={this.onKeyDown}>{options}</ul>
    }
}

export default Suggestions;