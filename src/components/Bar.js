import React, { Component } from 'react';
function FilterTag(props) {
  return (
    <li><input type="radio" id={props.name} name="filter" onClick={props.filter}/><label htmlFor={props.name}>{props.name}</label></li>
  )
}
class Bar extends Component {
    render() {
        return (
            <div className="sdkBar">
                <ul>
                    <li style={{position: 'relative'}}><input type="radio" id="search" name="filter"/><input type="text" id="searchInput" placeholder="Search" onChange={this.props.filter} onClick={()=>document.getElementById('search').checked = true}/><div className="searchIcon"></div></li>
                    <li><input type="radio" id="all" onClick={this.props.filter} name="filter"/><label htmlFor="all">All</label></li>
                    {this.props.tags ? 
                        this.props.tags.map((item, i)=>{
                        return (
                            <FilterTag key={i} name={item} filter={this.props.filter} />
                        )
                        })
                        :
                        null
                    }
                </ul>
            </div>
        )
        
    }
}

export default Bar;