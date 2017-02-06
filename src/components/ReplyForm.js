
'use strict';

const React       = require('react');
const Immutable   = require('immutable');

const ReplyFormStyle =
  { padding: '6px'
  , display: 'flex'
  , flexDirection: 'column'
  , backgroundColor: '#c4c4c4'
  };
const TopRowStyle =
  { display: 'flex'
  , flexDirection: 'row'
  , justifyContent: 'flex-end'
  , margin: '10px 0'
  , color: '#444'
  , fontSize: 'small'
  };
const BottomRowStyle =
  { display: 'flex'
  , flexDirection: 'row'
  , justifyContent: 'flex-end'
  , margin: '10px 0'
  };

const ReplyForm = React.createClass({

  displayName: 'ReplyForm',

  propTypes:
    { isOpen: React.PropTypes.bool.isRequired
    , targetItem: React.PropTypes.instanceOf(Immutable.Map)
    },

  render() {
    let content = [];

    if(this.props.isOpen === true
    && this.props.targetItem !== undefined
    ){
      let targetItem = this.props.targetItem.toJS();

      let topRow = (
        <div
          key="topRow"
          style={TopRowStyle}
        >
          {`Replying to ${targetItem.author}`}
        </div>
      );

      content =
        [ topRow
        , <textarea
          key="textArea"
          rows="6"
          />
        , <div
          key="bottomRow"
          style={BottomRowStyle}
          >
            <button>{'reply'}</button>
          </div>
        ];
    }


    return (
      <div style={ReplyFormStyle}>
        {content}
      </div>
    );
  }
});

module.exports = ReplyForm;
