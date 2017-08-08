import React, { Component } from 'react';
import './App.css';
import data from './sdks.json';
import Bar from './components/Bar';

function Item(props) {
  return (
    <li>
      <div className="item">
        <div className="title">{props.title}</div>
        <div className="tags">
          {props.tags.map((item, i) => {
            return i !== props.tags.length -1 ? item + ', ' : item
          })}
        </div>
      </div>
    </li>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: data.results,
      tags: []
    }
    this.filter = this.filter.bind(this);
    this.imutableData = data.results;
  }

  filter({target}) {
    // main method for filtered data
    var tag = target.id,
        filteredData = [];

    if (emptySearchOrSelectAll()) {
      filteredData = this.imutableData;
    } else if (tag === "searchInput") {
        // if search filter
        filteredData = this.imutableData.filter((item) => {
          return item.title.toLowerCase().indexOf(target.value.toLowerCase()) !== -1;
        });
    } else {
       // if search by tags
      filteredData = this.imutableData.filter((item) => {
        if (item.tags.length > 1) {
          let newArr = item.tags.filter((i) => {
            return i === tag;
          })
          return newArr.length ? true : false;
        } else {
          if (item.tags.length) {
            return item.tags[0] === tag;
          }
        }
        return false;
      });
    }


    function emptySearchOrSelectAll() {
      // if select "all" filter or empty search filed  - return main state;
      return tag === "all" || (tag === "searchInput" && !target.value.length);
    }
    
    // update state
    this.setState({
      data: filteredData
    });
  }

  componentDidMount() {
    // set tags for filter panel
    this.setState({
      tags: unique(data.results)
    });

    function unique(arr) {
      // return arr with unique data(tags);
      // var obj = object for check uique property
      // obj[item] = true; = remember item of array as property obj
      
      var obj = {},
          i = 0;

      for (i; i < arr.length; i++) {
        if (arr[i].tags.length > 1) {
          arr[i].tags.map((item) => {
            obj[item] = true; 
          });
        } else {
          if (arr[i].tags.length) obj[arr[i].tags[0]] = true;
        }
      }
      return Object.keys(obj);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="mainTitle">SDKs</div>
        <div className="sdkWrap">
          <Bar filter={this.filter} tags={this.state.tags}/>
          <div className="sdkMain">
              <ul>
                {this.state.data.length ? 
                  this.state.data.map((item) => {
                    return (
                      <Item key={item.id} title={item.title} tags={item.tags}/>
                    )
                  })
                  :
                  null
                }
              </ul>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
