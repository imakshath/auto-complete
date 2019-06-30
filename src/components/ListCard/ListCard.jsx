import React from 'react';
import './ListCard.scss';

const ListCard = (props) => {
    return <div className={`card-wrapper ${props.active ? 'active' : ''}`}>
        <h4><HighlightText label={props.id} value={props.query} /></h4>
        <p className="title-text italic">
            <HighlightText label={props.name} value={props.query} />
        </p>
        <p className="address m-t-10">
            <HighlightText label={props.address} value={props.query} />
        </p>
    </div>
}

const HighlightText = ({label, value}) => {
    if (!value) {
      return label;
    }
    return (<span>
      { label.split(value)
        .reduce((prev, current, i) => {
          if (!i) {
            return [current];
          }
          return prev.concat(<span className="highlight" key={value + current}>{ value }</span>, current);
        }, [])
      }
    </span>);
};

export const NoDataListCard = () => (
    <div className="card-wrapper">
        <center>No User Found</center>
    </div>
)

export default ListCard;