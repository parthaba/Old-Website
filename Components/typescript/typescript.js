var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
  this.hold = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap glow white">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - (Math.random() * 0.5 + 1) * 80;

  if (this.isDeleting) {
    if (this.txt[0] === "S") {
      delta /= 3;
    }
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    if (this.txt[0] === "S") {
      this.period = 200;
      this.hold = true;
    }
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.period = 1200;
    this.loopNum++;
    if (this.hold) {
      delta = 1500;
      this.hold = false;
    } else {
      delta = 500;
    }
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};
