document.addEventListener(
  "DOMContentLoaded",
  function () {

    function changeSliderHandler(event) {
      Caman("#image", function renderCaman() {
        this[event.target.name](event.target.value).render(function () {
          if (textInput.value) {
            applyText();
          }
        });
        console.log(event.target.name + "  " + event.target.value);
      });
    }

    var ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach(function (range) {
      range.onchange = changeSliderHandler;
    });

    var resetButton = document.getElementById("reset");
    function reset() {
      ranges.forEach(function (range) {
        range.value = 0;
      });
      document.getElementById("message").value='';
      Caman("#image", function () {
        this.revert(true);
      });
    }

    resetButton.onclick = reset;

    function filterButtonHandler(event) {
      Caman("#image", function () {
        //this.revert(false);
        this[event.target.id]().render(function () {
          if (textInput.value) {
            applyText();
          }
        });
        console.log(event.target.id);
      });
    }

    var filterButtons = document.querySelectorAll(".filter");
    filterButtons.forEach(function (filterButton) {
      filterButton.onclick = filterButtonHandler;
    });

    var saveButton = document.getElementById("save");
    function save() {
      Caman("#image", function () {
        this.render(function () {
          if (textInput.value) {
            applyText();
          }
          this.save("image.png");
        });
      });
    }

    saveButton.onclick = save;

    var textInput = document.getElementById("message");
    function applyText() {
      var canvas = document.getElementById("image");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      var boxTop = canvas.height / 2 + 100;
      var height = canvas.height / 10;
      ctx.fillRect(0, boxTop, canvas.width, height);
      var fontheight = (height - 20).toString();
      ctx.font = fontheight + "px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(textInput.value, canvas.width / 2, boxTop + 40);
    }

    var textSubmitButton = document.getElementById("submit");
    textSubmitButton.onclick = applyText;

    function previewCrop() {
      console.log("hi");
      Caman("#image", function renderCaman() {});
      var width = Number(document.getElementById("width").value);
      var height = Number(document.getElementById("height").value);
      var x = Number(document.getElementById("x").value);
      var y = Number(document.getElementById("y").value);
      if(!width || !height || !x || !y){
        width=height=x=y=0;
      }
      var canvas = document.getElementById("image");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(x, y, width, height);
      setTimeout(function () {
        reset();
      }, 1500);
    }

    var preview = document.getElementById("preview");
    preview.onclick = previewCrop;

    function cropImage() {
      Caman("#image", function renderCaman() {
        this.brightness(0).render();
      });
      var width = Number(document.getElementById("width").value);
      var height = Number(document.getElementById("height").value);
      var x = Number(document.getElementById("x").value);
      var y = Number(document.getElementById("y").value);
      if (!width || !height || !x || !y) {
        getfilters();
      } else {
        Caman("#image", function () {
          this.crop(width, height, x, y);
          this.render();
        });
        resetButton.style.display = "block";
        saveButton.style.display = "block";
        cropFeature.style.display = "none";
        effectsheadingbutton.style.display = "block";
        filtersheadingbutton.style.display="block";
        textheading.style.display="block";
        Caman("#image", function renderCaman() {});
      }
    }

    var crop = document.getElementById("crop");
    crop.onclick = cropImage;

    var qw = document.getElementById("filtersliders");
    var as= document.getElementById("filterbuttons");
    var addtext= document.getElementById("text");
    var cropFeature = document.getElementById("cropFeature");

    function getfilters() {
      resetButton.style.display = "block";
      saveButton.style.display = "block";
      cropFeature.style.display = "none";
      effectsheadingbutton.style.display = "block";
      filtersheadingbutton.style.display="block";
      textheading.style.display="block";
      Caman("#image", function renderCaman() {});
    }

    var continueButton = document.getElementById("continuebutton");
    continueButton.onclick = getfilters;
    var effectsheadingbutton = document.getElementById("effectheading");
    effectsheadingbutton.onclick = function () {
      if (effectsheadingbutton.textContent == "Effects v") {
        qw.style.display = "none";
        effectsheadingbutton.textContent = "Effects >";
      } else {
        qw.style.display = "block";
        effectsheadingbutton.textContent = "Effects v";
      }
    };

    var filtersheadingbutton = document.getElementById("filterheadingbutton");
    filtersheadingbutton.onclick = function () {
      if (filtersheadingbutton.textContent == "Filters v") {
        as.style.display = "none";
        filtersheadingbutton.textContent = "Filters >";
      } else {
        as.style.display = "block";
        filtersheadingbutton.textContent = "Filters v";
      }
    };

    var textheading = document.getElementById("textheading");
    textheading.onclick = function () {
      if (textheading.textContent == "Add Text v") {
        addtext.style.display = "none";
        textheading.textContent = "Add Text >";
      } else {
        addtext.style.display = "block";
        textheading.textContent = "Add Text v";
      }
    };

    resetButton.style.display = "none";
    saveButton.style.display = "none";
    qw.style.display = "none";
    as.style.display="none";
    addtext.style.display="none";
    effectsheadingbutton.style.display = "none";
    filtersheadingbutton.style.display="none";
    textheading.style.display="none";
    previewCrop();
  },
  false
);
