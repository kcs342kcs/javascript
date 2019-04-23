var uData = data;

var dates = [''];
var cities = [''];
var states = [''];
var countrys = [''];
var shapes = [''];
var date_Filter = '';
var city_Filter = '';
var state_Filter = '';
var country_Filter = '';
var shape_Filter = '';

function dateFilterSet(){
  date_Filter = document.getElementById('dateMenu').options[dateMenu.selectedIndex].text;
  console.log(date_Filter);
};
function cityFilterSet(){
  city_Filter = document.getElementById('cityMenu').options[cityMenu.selectedIndex].text;
  console.log(city_Filter);
};
function stateFilterSet(){
  state_Filter = document.getElementById('stateMenu').options[stateMenu.selectedIndex].text;
  console.log(state_Filter);
};
function countryFilterSet(){
  country_Filter = document.getElementById('countryMenu').options[countryMenu.selectedIndex].text;
  console.log(country_Filter);
};
function shapeFilterSet(){
  shape_Filter = document.getElementById('shapeMenu').options[shapeMenu.selectedIndex].text;
  console.log(shape_Filter);
};

function sorter(k,v){
  switch (k){
    case('datetime'):
      if(! dates.includes(v)){
        dates.push(v);
      }
      break;
    case('city'):
      if(! cities.includes(v)){
        cities.push(v);
      }
      break;
    case('state'):
      if(! states.includes(v)){
        states.push(v);
      }
      break;
    case('country'):
      if(! countrys.includes(v)){
        countrys.push(v);
      }
      break;
    case('shape'):
      if(! shapes.includes(v)){
        shapes.push(v);
      }
      break;
    default:
      break;
  }
}

function buildTable(){
  console.log('got here buildTable');
  var cutData = uData;
  if(date_Filter){
    console.log('got here date');
    cutData = cutData.filter(function(d){
        return d.datetime === date_Filter;
    });
  };
  if(city_Filter){
     console.log('got here city');
      cutData = cutData.filter(function(d){
         return d.city === city_Filter;
     });
  };
  if(state_Filter){
      console.log('got here state');
      cutData = cutData.filter(function(d){
         return d.state === state_Filter;
      });
  };
  if(country_Filter){
      console.log('got here country');
      cutData = cutData.filter(function(d){
          return d.country === country_Filter;
      });
  };
  if(shape_Filter){
      console.log('got here shape');
      cutData = cutData.filter(function(d){
         return d.shape === shape_Filter;
      });
  };

  var tbody = d3.select("tbody").remove();
  var tb = d3.select("table");
  tb.append("tbody");
  var cutTbody = d3.select("tbody");
  if(cutData.length){
    cutData.forEach((ufo) => {
        var row = cutTbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
          var cell = cutTbody.append("td");
          cell.text(value);
        });
      });
  }
  else{
    console.log('no data in data set matched filter critera');
    noData();
  }
};

function noData(){
  alert('No data in data set matched filter criteria, reloading page.');
  window.location.reload();
}

function buildFilterOptions(){

  var dateFilter = d3.select("#dateMenu");
  dates.forEach(function(d){
    var item = dateFilter.append("option");
    item.text(d);
  });

  var cityFilter = d3.select("#cityMenu");
  cities.forEach(function(d){
    var item = cityFilter.append("option");
    item.text(d);
  });

  var stateFilter = d3.select("#stateMenu");
  states.forEach(function(d){
    var item = stateFilter.append("option");
    item.text(d);
  });

  var countryFilter = d3.select("#countryMenu");
  countrys.forEach(function(d){
    var item = countryFilter.append("option");
    item.text(d);
  });

  var shapeFilter = d3.select("#shapeMenu");
  shapes.forEach(function(d){
    var item = shapeFilter.append("option");
    item.text(d);
  });
};

var f = d3.select('#applySubmit');
f.on('click',function (){
  console.log('got here filterData');
  buildTable();
});

var r = d3.select('#resetSubmit');
r.on('click',function(){
  buildFilterOptions();
  date_Filter = '';
  city_Filter = '';
  state_Filter = '';
  country_Filter = '';
  shape_Filter = '';
  buildTable();
});

var tbody = d3.select("tbody");
var one = false;
uData.forEach((ufo) => {
    one = true;
    var row = tbody.append("tr");
    Object.entries(ufo).forEach(([key, value]) => {
        var cell = tbody.append("td");
        cell.text(value);
        sorter(key,value);
    });
});

if(one){
  buildFilterOptions();
  one = false;
};