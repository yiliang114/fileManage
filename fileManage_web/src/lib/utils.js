export const formatTime = (date) => {
  if (!date) {
    return
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

//获取n天前／n天后的时间
export const getTime = (day) => {
  const date = new Date();
  const milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * day;
  return new Date(milliseconds);
}

const now = Date.now || function () {
  return new Date().getTime();
};

const later = function (fn, ms, context, data) {
  var f = function () {
    fn.apply(context, data);
  };
  var r = setTimeout(f, ms);

  return {
    id: r,
    cancel: function () {
      clearTimeout(r);
    }
  };
}

export const buffer = (fn, ms, context) => {
  var lastStart = 0;
  var lastEnd = 0;
  var timer = null;

  ms = ms || 150;
  const run = function () {
    if (timer) {
      timer.cancel();
      timer = 0;
    }
    lastStart = now();
    fn.apply(context || this, arguments);
    lastEnd = now();
  }
  return function () {
    if (!lastStart || lastEnd >= lastStart && now() - lastEnd > ms || lastEnd < lastStart && now() - lastStart > ms * 8) {
      run.apply(context, arguments);
    } else {
      if (timer) {
        timer.cancel();
      }
      timer = later(run, ms, context, arguments);
    }
  };
};

export const getUrlParams = (str = window.location.search.substr(1)) => {
  const obj = {};
  if (str) {
    const ary = str.split('&');
    ary.forEach((itemData) => {
      let tempAry = itemData.split('=');
      if (tempAry && tempAry.length) {
        obj[tempAry[0]] = tempAry[1];
      }
    });
  }
  return obj;
}
