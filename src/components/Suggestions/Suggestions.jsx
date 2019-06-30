import React from 'react'
import ListCard, { NoDataListCard } from '../ListCard/ListCard';
import './Suggestions.scss';


const Suggestions = (props) => {
    const { query, activeSuggestion, results, onSelectItem, handleMouseFocus, handleKeyDown } = props;
    const options = results.length ? results.map((r, index) => (
        <li tabIndex={index} onMouseEnter={() => handleMouseFocus(index)} onMouseLeave={() => handleMouseFocus(index)} key={r.name} onClick={() => onSelectItem(r)} key={r.id}>
            <ListCard query={query} {...r} active={(activeSuggestion === index) ? true : false} />
        </li>
    )): <NoDataListCard />
    return <ul className="suggestions" onKeyDown={handleKeyDown}>{options}</ul>
}

export default Suggestions;