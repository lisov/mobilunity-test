import React, { Component } from 'react';
import './App.css';
import arr from './sdks.json';
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
      data: arr.results,
      tags: []
    }
    this.filter = this.filter.bind(this);
    this.imutableData = arr.results;
  }

  filter({target}) {
    // main method for filtered data
    var tag = target.id,
        newData = [];
        console.log(target.value);
    if (tag === "all" || (tag === "searchInput" && !target.value.length)) {
      // if select "all" filter or empty search filed  - return main state;
      newData = this.imutableData;
    } else if (tag === "searchInput") {
        // if search filter
        newData = this.imutableData.filter((item) => {
          return item.title.toLowerCase().indexOf(target.value.toLowerCase()) !== -1;
        });
    } else {
       // if search by tags
      newData = this.imutableData.filter((item) => {
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
    
    // update state
    this.setState({
      data: newData
    });
  }

  componentDidMount() {
    function unique(arr) {
      // return arr with unique data(tags)
      var obj = {},
          i = 0;

      for (i; i < arr.length; i++) {
        var str;
        if (arr[i].tags.length > 1) {
          arr[i].tags.map((item) => {
            str = item;
          });
        } else {
          if (arr[i].tags.length) {
            str = arr[i].tags[0];
          }
        }
        obj[str] = true; // remember string as property obj
      }
      return Object.keys(obj);
    }
    
    this.setState({
      tags: unique(arr.results)
    })
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
