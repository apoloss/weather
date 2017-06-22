import React from 'react';
import ReactDOM from 'react-dom'
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import 'skeleton-framework/dist/skeleton.min.css';

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      city: '',
      date: '',
      min: '',
      max: '',
      temperature: '',
      humidity: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePicker = this.handlePicker.bind(this);

  }
  findLatLongByCityName(city){
    axios.get('http://maps.googleapis.com/maps/api/geocode/json?address='+ this.state.city +'&sensor=false')
      .then(res => {
        var lat = res.data.results["0"].geometry.location.lat;
        var lon = res.data.results["0"].geometry.location.lng;
        var time = '1497549600'
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var url = proxy + 'https://api.darksky.net/forecast/1d91e20fc6218bafefe2b9bd74b2df12/'+lat+','+lon+','+time
        return axios.get(url)
          .then(res =>{
            this.setState({
              min: res.data.daily.data["0"].temperatureMin,
              max: res.data.daily.data["0"].temperatureMax,
              temperature: res.data.currently.temperature,
              humidity: res.data.currently.humidity
            })
          });

    });
    return null;
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handlePicker (date) {
    this.setState({date: date})
    this.toggleCalendar()
  }

  toggleCalendar (e) {
    e && e.preventDefault()
  }

  render() {
    const isLoggedIn = this.state.min;
    let results = null;
    if (isLoggedIn) {
      results = <div className='row'>
          <table id='results' className="u-full-width">
            <thead>
              <tr>
                <th>Min</th>
                <th>Max</th>
                <th>Temperature</th>
                <th>Humidity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.min}</td>
                <td>{this.state.max}</td>
                <td>{this.state.temperature}</td>
                <td>{this.state.humidity}</td>
              </tr>
            </tbody>
          </table>
        </div>
    }
    return (
      <div className='container'>
        <div className='row'>
          <h3>YOYO Weather</h3>
          <div className='three columns'>
            <label htmlFor='city'>City</label>
            <input
              name='city'
              id='city'
              onChange={this.handleChange}
              value={ this.state.city }
              type='text'
              placeholder='Enter a city'
              className='u-full-width'
            />
          </div>
          <div className='three columns'>
            <label htmlFor='city'>Date</label>
            <DatePicker
              name='date'
              id='date'
              selected={this.state.date}
              onChange={this.handlePicker}
              placeholderText='Pick a date'
              calendarClassName='u-full-width'
            />
          </div>
          <div className='twelve columns'>
            <button
              id='forecast'
              className='button-primary'
              onClick={() => this.findLatLongByCityName(this.state.city)}
              disabled={!this.state.city || !this.state.date}
            >See Forecast</button>
          </div>
        </div>
        {results}
      </div>
    );
  }
}
ReactDOM.render(
  <Weather />,
  document.getElementById('root')
);