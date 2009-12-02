(function(){
  
  function hasParentWithClass(element, className) {
    var reClassName = new RegExp('(?:\\s|^)' + className + '(?:\\s|$)');
    while ((element = element.parentNode)) {
      if (element && reClassName.test(element.className)) return true;
    }
    return false;
  }
  function getVersionTotal(element) {
    var parentRow;
    while ((element = element.parentNode)) {
      if (element && (element.tagName.toUpperCase() === 'TR')) {
        parentRow = element;
        break;
      }
    }
    for (var i = 0, j = 0, child, len = parentRow.childNodes.length; i < len; i++) {
      child = parentRow.childNodes[i];
      if (child.nodeType !== 1) continue;
      if (j++ == 2) return parseInt(child.innerHTML.replace(/,/g, ''));
    }
  }
  function countPercentages() {
    var total = 0;
    for (var prop in versionTotals) {
      total += versionTotals[prop];
    }
    for (var prop in versionTotals) {
      versionTotals[prop] += (' (' + ((versionTotals[prop] * 100) / total).toFixed(2) + '%)');
    }
  }
  function padString(str, length) {
    var numSpacesToPad;
    if (str.length < length) {
      numSpacesToPad = length - str.length;
      return str + new Array(numSpacesToPad + 1).join(' ');
    }
    return str;
  }
  
  function displayTotals() {
    var str = '';
    for (var name in versionTotals) {
      str += (padString(name, 5) + ': ' + versionTotals[name] + '\n')
    }
    alert(str);
  }
  
  var anchors = document.getElementsByTagName('a'), 
      i = anchors.length, el, match, majorVersion, 
      color, bgColor;
  
  var versionTotals = { '1': 0, '1.5': 0, '2': 0, '3': 0, '3.5+': 0 };

  while (i--) {
    if (!hasParentWithClass((el = anchors[i]), 'text_wrapper')) continue;
    if ((match = el.innerHTML.match(/^\s*(\d\.\d)/)) && match[1]) {
      
      majorVersion = parseFloat(match[1]);
      color = 'inherit';
      
      if (majorVersion >= 3.5) { 
        bgColor = 'lightgreen'; 
        versionTotals['3.5+'] += getVersionTotal(el); 
      }
      else if (majorVersion >= 3) { 
        bgColor = 'yellow'; 
        versionTotals['3'] += getVersionTotal(el); 
      }
      else if (majorVersion >= 2) { 
        bgColor = 'orange'; 
        versionTotals['2'] += getVersionTotal(el); 
      }
      else if (majorVersion >= 1.5) { 
        bgColor = 'red'; 
        color = '#fff'; 
        versionTotals['1.5'] += getVersionTotal(el); 
      }
      else if (majorVersion >= 1) { 
        bgColor = 'black'; 
        color = '#fff'; 
        versionTotals['1'] += getVersionTotal(el); 
      }
      else continue;
      
      el.style.backgroundColor = bgColor;
      el.style.padding = '0.5em';
      el.style.color = color;
    }
  }
  
  countPercentages();
  displayTotals();
})();