'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Weather = function (_React$Component) {
  _inherits(Weather, _React$Component);

  function Weather() {
    _classCallCheck(this, Weather);

    var _this = _possibleConstructorReturn(this, (Weather.__proto__ || Object.getPrototypeOf(Weather)).call(this));

    _this.state = {
      city: ''
    };
    _this.handleChange = _this.handleChange.bind(_this);

    return _this;
  }

  _createClass(Weather, [{
    key: 'findLatLongByCityName',
    value: function findLatLongByCityName(city) {
      //http://maps.googleapis.com/maps/api/geocode/json?address=Miami+FL&sensor=false
      console.log(city);
      axios.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.city + '&sensor=false').then(function (res) {
        //const posts = res.data.data.children.map(obj => obj.data);
        console.log(res.data.results["0"].geometry.location);
        var lat = res.data.results["0"].geometry.location.lat;
        var lon = res.data.results["0"].geometry.location.lng;
        var time = '1497549600';
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var url = proxy + 'https://api.darksky.net/forecast/1d91e20fc6218bafefe2b9bd74b2df12/' + lat + ',' + lon + ',' + time;
        //https://api.darksky.net/forecast/[key]/[latitude],[longitude]
        axios.get(url).then(function (res) {
          console.log(res);
        });
      });
      return null;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(_ref) {
      var target = _ref.target;

      this.setState(_defineProperty({}, target.name, target.value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement('input', {
          name: 'city',
          onChange: this.handleChange,
          value: this.state.city,
          type: 'text',
          placeholder: 'Enter a city'
        }),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.findLatLongByCityName(_this2.state.city);
            } },
          'See Forecast'
        )
      );
    }
  }]);

  return Weather;
}(React.Component);

ReactDOM.render(React.createElement(Weather, null), document.getElementById('root'));
