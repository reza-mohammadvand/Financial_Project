
// main tabs
$( function() {
    $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
} );



// Clock
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  startTime()




// accordion
var $accordion = $('.js-accordion');

// default settings
var settings = {
  // animation speed
  speed: 400,  // Changed 'Speed' to 'speed'
 
  // close all other accordion items if true
  oneOpen: false
};

var accordion = {
  // pass configurable object literal
  init: function($settings) {
    var $accordion_header = $accordion.find('.js-accordion-header');
    $accordion_header.on('click', function() {
      accordion.toggle($(this));
    });
   
    $.extend(settings, $settings);
   
    // ensure only one accordion is active if oneOpen is true
    if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
      $('.js-accordion-item.active:not(:first)').removeClass('active');
    }
   
    // reveal the active accordion bodies
    $('.js-accordion-item.active').find('> .js-accordion-body').show();
  },
  toggle: function($this) {
    var $accordion_item = $('.js-accordion-item');
         
    if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0] ) {
      $this.closest('.js-accordion')
             .find('> .js-accordion-item')
             .removeClass('active')
             .find('.js-accordion-body')
             .slideUp()
    }
   
    // show/hide the clicked accordion item
    $this.closest('.js-accordion-item').toggleClass('active');
    $this.next().stop().slideToggle(settings.speed);
  }
}

// Call the function manually whenever you need it
accordion.init({ speed: 300, oneOpen: true });





$(document).ready(function() {
  // Add click event listener to all .accordion-header elements
  $(document).on('click', '.accordion-header', function() {
    var $accordionBody = $(this).closest('.accordion-item').find('.accordion-body');

    // Close all .accordion-body elements
    $('.accordion-body').not($accordionBody).slideUp();

    // Toggle the .accordion-body element within the same .accordion-item as the clicked .accordion-header
    $accordionBody.slideToggle();
  });
});





















  // bell

function shakeBell() {
    $("#bell-icon").css({
        "animation": "rotation 0.2s linear",
        "animation-iteration-count": "5" // Run the animation 3 times
    }); // Apply the rotation animation
    setTimeout(function(){ 
        $("#bell-icon").css({
            "animation": "",
            "animation-iteration-count": ""
        }); 
    }, 1500); // Remove the animation after 1.5s (0.5s * 3)
}


var i = 1;
var badgeNum;
var badge;

function updateBadge() {
    badge = document.getElementById('badge');
    var alertNum = i++;
    
    var badgeChild = badge.children[0];
    if(badgeChild.className === 'badge-num')
        badge.removeChild(badge.children[0]);

    badgeNum = document.createElement('div'); 
    badgeNum.setAttribute('class','badge-num');
    badgeNum.innerText = alertNum;
    var insertedElement = badge.insertBefore(badgeNum, badge.firstChild); 
}

function resetNumber() {
    i = 0;
    updateBadge()
}




// notification
var notification;
var body = document.getElementsByTagName("body")[0]; // Select the first element
var visible = false;
var queue = [];

function createNotification() {
    notification = document.createElement('div');
    var btn = document.createElement('button');
    var msg = document.createElement('div');
    btn.className = 'notification-close';
    msg.className = 'notification-message';
    btn.addEventListener('click', hideNotification, false);
    notification.addEventListener('animationend', hideNotification, false);
    notification.addEventListener('webkitAnimationEnd', hideNotification, false);
    notification.appendChild(btn);
    notification.appendChild(msg);
}

function updateNotification(type, signal,symbol) {
    notification.className = 'notification notification-' + type;
    notification.style.background = "#1fb74c"
    if (signal =="Sell") {
    notification.style.background = "#e91e63"
    }
    message = "You have a new "+signal+" signal on "+symbol
    notification.querySelector('.notification-message').innerHTML = message;
}

function showNotification(type, signal,symbol) {
    if (visible) {
        queue.push([type, signal,symbol]);
        return;
    }
    if (!notification) {
        createNotification();
    }
    updateNotification(type, signal,symbol);
    body.appendChild(notification);
    visible = true;
}

function hideNotification() {
    if (visible) {
        visible = false;
        body.removeChild(notification);
        if (queue.length) {
            showNotification.apply(null, queue.shift());
        }
    } 
}





// search box
// Your list of items
var list = [["AAPL","#tabs-3"],["GOOGL","#tabs-4"],["AMZN","#tabs-5"],["MSFT","#tabs-6"],["TSLA","#tabs-7"]];

$(document).ready(function() {
  $('#searchInput').on('input', function() {
      var input = $(this).val().toLowerCase();

      // If the input is empty, hide the list
      if (input === '') {
          $('#list').hide();
          return;
      }

      var result = list.filter(item => item[0].toLowerCase().includes(input));

      // Clear the current list
      $('#list').empty();

      // Add the search results to the list
      result.forEach(item => {
          var a = $('<a>').text(item[0]).attr('href', item[1]);
          var li = $('<li>').append(a).hide().appendTo('#list').slideDown(200);
      });

      // Show the list
      $('#list').show();
  });
});






// Create Charts
function createChart(chartId, volumeData, timeData, priceData, maData, emaData, rsiData) {
  
  var total = volumeData.reduce((a, b) => a + b, 0);
  var average = total / volumeData.length;

  var numDataPoints = 15; // The number of data points
  var pointWidth = 80; // The width of each data point in px
  document.getElementById(chartId).width = numDataPoints * pointWidth;

  const myChart = new Chart(chartId, {
    type: "bar",
    data: {
      labels: timeData, // This will be populated with your time data
      datasets: [{
        label: 'price',
        data: priceData, // This will be populated with your price data
        borderColor: 'rgba(75,192,192,1)',
        type: 'line'
      }, {
        label: 'MA',
        data: maData, // This will be populated with your moving average data
        borderColor: 'rgba(192,75,192,1)',
        type: 'line'
      }, {
        label: 'EMA',
        data: emaData, // This will be populated with your EMA data
        borderColor: 'rgba(192,192,75,1)',
        type: 'line'
      }, {
        label: 'RSI',
        data: rsiData, // This will be populated with your RSI data
        borderColor: 'rgba(75,75,192,1)',
        type: 'line'
      },{
        label: 'Volume',
        data: volumeData, // This will be populated with your volume data
        type: 'bar',
        backgroundColor: 'rgba(0,0,0,0.5)',
        yAxisID: 'y-axis-volume',
        order: 1,
        barPercentage: 0.3
      }
    ]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'right', // Change this to 'left' to move the price axis to the left
          id: 'y-axis-1',
        }, 
        {
          id: 'y-axis-volume',
          type: 'linear',
          display: false, // Set this to false to hide the volume axis
          position: 'right',
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            min: average / 2, // half the average
            max: average * 4, // forth the average
          }
        }   
      ],
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            if (label) {
              label += ': ';
            }
            label += tooltipItem.yLabel;
            return label;
          },
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x'
          },
          zoom: {
            enabled: true,
            mode: 'x'
          }
        }
      },
      legend: {
        display: false // Hide the default legend
      },
    }
  });

  // Generate a custom legend
  var ul = document.getElementById(chartId + "-legend");
  myChart.data.datasets.forEach((dataset, i) => {
      var li = document.createElement("li");
      li.style.color = dataset.borderColor;
      li.textContent = dataset.label;
      li.onclick = function(e) {
          var hidden = !myChart.getDatasetMeta(i).hidden;
          myChart.getDatasetMeta(i).hidden = hidden;
          li.style.textDecoration = hidden ? "line-through" : "";
          myChart.update();
      };
      ul.appendChild(li);
  });

  return myChart;
}

// Initialize empty arrays
var volumeData1 = [5000,4500,2541,5685,4850,5000,4500,2541,5685,4850,5000,4500,2541,5685,4850,5000,4500,2541,5685,4850,5000,4500,2541,5685,4850,];
var timeData1 = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05","2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-05","2024-01-05", "2024-01-05", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05","2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-05","2024-01-05", "2024-01-05"];
var priceData1 = [120.1, 121.5, 119.7, 122.3, 123.5,120.1, 121.5, 119.7, 122.3, 123.5, 123.5, 75, 75, 121.5, 119.7, 122.3, 123.5,120.1, 121.5, 119.7, 122.3, 123.5, 123.5, 75, 71];
var maData1 = [120.1, 120.8, 120.43, 120.9, 121.42,120.1, 120.8, 120.43, 120.9, 121.42, 123.5, 75, 75, 120.8, 120.43, 120.9, 121.42,120.1, 120.8, 120.43, 120.9, 121.42, 123.5, 75, 72];
var emaData1 = [120.1, 120.93, 120.48, 121.27, 122.07,120.1, 120.93, 120.48, 121.27, 122.07, 123.5, 75, 75, 120.8, 120.43, 120.9, 121.42,120.1, 120.8, 120.43, 120.9, 121.42, 123.5, 75, 73];
var rsiData1 = [70, 72, 69, 73, 75,70, 72, 69, 73, 75, 75, 75, 75, 72, 69, 73, 75,70, 72, 69, 73, 75, 75, 75, 74];

var volumeData2 = [10];
var timeData2 = [10];
var priceData2 = [10];
var maData2 = [10];
var emaData2 = [10];
var rsiData2 = [10];

// Function to add data
function addData(chart, label, priceData, maData, emaData, rsiData, volumeData) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(priceData);
    chart.data.datasets[1].data.push(maData);
    chart.data.datasets[2].data.push(emaData);
    chart.data.datasets[3].data.push(rsiData);
    chart.data.datasets[4].data.push(volumeData);
    chart.update();
}

// Usage:
var chart1 = createChart('AAPL-chart', volumeData1, timeData1, priceData1, maData1, emaData1, rsiData1);
// Now you can add data to your chart as needed
addData(chart1, "2024-01-06", 1024.7, 1201.92, 1022.57, 76, 5000);

var chart1 = createChart('GOOGL-chart', volumeData1, timeData1, priceData1, maData1, emaData1, rsiData1);
addData(chart1, "2024-01-07", 1024.7, 1201.92, 1022.57, 76, 5000);

var chart1 = createChart('AMZN-chart', volumeData1, timeData1, priceData1, maData1, emaData1, rsiData1);
addData(chart1, "2024-01-08", 1024.7, 1201.92, 1022.57, 76, 5000);

var chart1 = createChart('MSFT-chart', volumeData1, timeData1, priceData1, maData1, emaData1, rsiData1);
addData(chart1, "2024-01-09", 1024.7, 1201.92, 1022.57, 76, 5000);

var chart1 = createChart('TSLA-chart', volumeData1, timeData1, priceData1, maData1, emaData1, rsiData1);
addData(chart1, "2024-01-10", 1024.7, 1201.92, 1022.57, 76, 5000);





// go to end of chart
window.onload = function() {
  var elements = document.getElementsByClassName("chartWrapper");
  for (var i = 0; i < elements.length; i++) {
    elements[i].scrollLeft = elements[i].scrollWidth;
  }
}




// small chart
function createSmallChart(chartId, priceData, timeData) {
  var last10Prices = priceData.slice(-10);
  var last10Labels = timeData.slice(-10);

  const mysmallChart = new Chart(chartId, {
      type: "line",
      data: {
          labels: last10Labels,
          datasets: [{
              label: 'price',
              data: last10Prices,
              borderColor: 'rgba(75,192,192,1)',
              type: 'line',
              categoryPercentage: 2,
          }]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [{
            ticks: {
              callback: function(value, index, values) {
                return '';
              }
            }
          }],
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-1',
          }],
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += tooltipItem.yLabel;
              return label;
            },
          }
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              enabled: true,
              mode: 'x'
            }
          }
        },
        legend: {
          display: false // Hide the default legend
        },
      }
    });

  return mysmallChart;
}

// Usage:
var smallChart1 = createSmallChart('AAPLsmallChart', priceData1, timeData1);
var smallChart2 = createSmallChart('GOOGLsmallChart', priceData1, timeData1);
var smallChart1 = createSmallChart('AMZNsmallChart', priceData1, timeData1);
var smallChart2 = createSmallChart('MSFTsmallChart', priceData1, timeData1);
var smallChart1 = createSmallChart('TSLAsmallChart', priceData1, timeData1);




// add data to web

var ws = new WebSocket("ws://localhost:5678/")
ws.onmessage = function (event) {
    var jsonData = JSON.parse(event.data);
    // set time
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    time =  h + ":" + m + ":" + s;
    if (jsonData.hasOwnProperty('data_type')) {
          // Create elements
          var divItem = document.createElement('div');
          var divHeader = document.createElement('div');
          var pNameSymbol = document.createElement('p');
          var pSignal = document.createElement('p');
          var pClosePrice = document.createElement('p');
          var pTime = document.createElement('p');
          var iElement = document.createElement('i');
          var divBody = document.createElement('div');
          var divContents = document.createElement('div');
          var divInner = document.createElement('div');
          var pPriceOrder = document.createElement('p');
          var pQuantity = document.createElement('p');

          // Set classes
          divItem.className = 'accordion-item';
          divHeader.className = 'accordion-header';
          divBody.className = 'accordion-body';
          divContents.className = 'accordion-body__contents';
          iElement.className = 'fa fa-chevron-down'
          iElement.ariaHidden = "true"
          divBody.style.display = "none"

          pTime.textContent = time;
          has_stock_symbol = jsonData.hasOwnProperty('stock_symbol')
          if (has_stock_symbol == true){
            var stockSymbolNode = document.createTextNode(jsonData.stock_symbol);
            pNameSymbol.appendChild(stockSymbolNode);

          }
          if(has_stock_symbol==false){
            pNameSymbol.textContent = "General";
          }

          if(jsonData.final_signal=="Buy"){
            if(has_stock_symbol){
              showNotification(null, 'Buy',jsonData.stock_symbol)
            }
            if(has_stock_symbol==false){
              showNotification(null, 'Buy',"GDP")
            }
            pSignal.textContent = 'Buy';
            divHeader.style.background = '#1fb74c';
          }
          if(jsonData.final_signal=="Sell"){
            if(has_stock_symbol){
              showNotification(null, 'Sell',jsonData.stock_symbol)
            }
            if(has_stock_symbol==false){
              showNotification(null, 'Sell',"GDP")
            }  
            pSignal.textContent = 'Sell';
            divHeader.style.background = '#e91e63';
          }
          if(jsonData.final_signal=="Neutral"){
            pSignal.textContent = 'Neutral';
          }

          if(jsonData.data_type=="order_book"){
            pClosePrice.textContent = 'Order Book';
            var a = document.createTextNode(jsonData.price);
            pPriceOrder.textContent = 'Price Order: ';
            pPriceOrder.appendChild(a);
            var b = document.createTextNode(jsonData.quantity);
            pQuantity.textContent = 'Quantity: ';
            pQuantity.appendChild(b);
          }
          if(jsonData.data_type=="news_sentiment"){
            pClosePrice.textContent = 'News Sentiment';
            var a = document.createTextNode(jsonData.sentiment_score);
            pPriceOrder.textContent = 'Sentiment Score : ';
            pPriceOrder.appendChild(a);
            var b = document.createTextNode(jsonData.sentiment_magnitude);
            pQuantity.textContent = 'Sentiment Magnitude : ';
            pQuantity.appendChild(b);
          }
          if(jsonData.data_type=="market_data"){
            pClosePrice.textContent = 'Market Data';
            var a = document.createTextNode(jsonData.market_cap);
            pPriceOrder.textContent = 'Market Cap : ';
            pPriceOrder.appendChild(a);
            var b = document.createTextNode(jsonData.pe_ratio);
            pQuantity.textContent = 'P/E Ratio : ';
            pQuantity.appendChild(b);
          }
          if(jsonData.data_type=="economic_indicator"){
            pClosePrice.textContent = 'Economic';
            pPriceOrder.textContent = 'Indicator Name : GDP Growth Rate';
            var b = document.createTextNode(jsonData.value);
            pQuantity.textContent = 'Value : ';
            pQuantity.appendChild(b);
          }
          divInner.appendChild(pPriceOrder);
          divInner.appendChild(pQuantity);
          divContents.appendChild(divInner);
          divBody.appendChild(divContents);
          divHeader.appendChild(pNameSymbol);
          divHeader.appendChild(pSignal);
          divHeader.appendChild(pClosePrice);
          divHeader.appendChild(pTime);
          divHeader.appendChild(iElement);
          divItem.appendChild(divHeader);
          divItem.appendChild(divBody);
          document.getElementById("news_page").prepend(divItem.cloneNode(true));

          if (jsonData.hasOwnProperty('stock_symbol')){
            var divItemCopy = divItem.cloneNode(true);
            if(jsonData.stock_symbol == "AAPL"){
              document.getElementById("AAPL-Signal").prepend(divItemCopy);
            }
            divItemCopy = divItem.cloneNode(true);
            if(jsonData.stock_symbol == "GOOGL"){
              document.getElementById("GOOGL-Signal").prepend(divItemCopy);
            }
            divItemCopy = divItem.cloneNode(true);
            if(jsonData.stock_symbol == "AMZN"){
              document.getElementById("AMZN-Signal").prepend(divItemCopy);
            }
            divItemCopy = divItem.cloneNode(true);
            if(jsonData.stock_symbol == "MSFT"){
              document.getElementById("MSFT-Signal").prepend(divItemCopy);
            }
            divItemCopy = divItem.cloneNode(true);
            if(jsonData.stock_symbol == "TSLA"){
              document.getElementById("TSLA-Signal").prepend(divItemCopy);
            }
          }
          
          if(jsonData.final_signal=="Buy" || jsonData.final_signal=="Sell"){
            document.getElementById("Signals").appendChild(divItem.cloneNode(true));
            updateBadge()
            shakeBell()
          }
          
    } else {
    console.log("sdgg");
    }
};



// if(jsonData.stock_symbol) {
//   var a = document.createTextNode(jsonData.stock_symbol);
//   document.body.appendChild(a);
// }










