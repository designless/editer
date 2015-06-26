$(function () {
	var themelist = require("ace/ext/themelist");
	console.log(themelist)
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/solarized_dark");
	editor.getSession().setMode("ace/mode/html");
	editor.session.setUseWrapMode(true);
	editor.session.setWrapLimitRange(null, null);
	editor.session.setUseSoftTabs(true);
	editor.session.setFoldStyle("markbegin");
	editor.session.setTabSize(2);
	editor.setOption("enableEmmet", true);
	editor.setHighlightActiveLine(false);
	editor.setDisplayIndentGuides(true);
	editor.setFontSize("14px");

	var delayPreview;

	var currentTemplate = 'blank';

	editor.on("change", function () {
		clearTimeout(delayPreview);
		delayPreview = setTimeout(updatePreview, 200);
	});

	function loadDefault() {
		$.get("source/"+currentTemplate+".html", function (data) {
			editor.setValue(data);
			editor.clearSelection();
			editor.scrollToLine(0);
		});
	}

	if (window.localStorage && window.localStorage["source"]) {
		editor.setValue(window.localStorage["source"]);
		editor.clearSelection();
		editor.scrollToLine(0);
	}
	else {
		loadDefault();
	}

	function saveStorage() {
		if (window.localStorage) {
			window.localStorage["source"] = editor.getValue();
		}
	}

	var delaySave;

	function updatePreview() {
		var previewFrame = document.getElementById('preview');
		var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
		preview.open();
		preview.write(editor.getValue());
		preview.close();

		if (window.localStorage) {
			clearTimeout(delaySave);
			delaySave = setTimeout(saveStorage, 1000);
		}
	}

	function windowResizer() {
		$('#wrap').height($(window).height() - $('#menu').outerHeight());
		editor.resize(true);
	}

	var resizeTimer = null;
	$(window).resize(function () {
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(windowResizer, 200);
	});

	windowResizer();

  function setTemplate(template) {
    $.get("source/"+template+'.html', function (data) {
      editor.setValue(data);
      editor.clearSelection();
      editor.scrollToLine(0);
      currentTemplate = template
    });
  }

	$(".reset").click(function () {
		loadDefault();
	});

	$(".reload").click(function () {
		updatePreview();
	});

	$(".open").click(function () {
		$("#editor").toggleClass('hide');
		$("#preview").toggleClass('full');
    if ($('#preview').hasClass('full')){
      $(this).html('<i class="fa fa-arrow-circle-right" title="Close"></i>')
    }
    else{
      $(this).html('<i class="fa fa-arrow-circle-left" title="Open"></i>')
    }
	});
	themelist.themes.forEach(function(theme){
		var $option = $('<option>').val(theme.theme).text(theme.name).data('dark', theme.isDark)
		$('#theme').append($option)
	});
	$('#theme').change(function(){
		editor.setTheme($(this).val());
    var selected = $(this).find('option:selected');
    var isDark = selected.data('dark');
    if (isDark){
      $('header').addClass('dark')
    }
    else{
      $('header').removeClass('dark')
    }
	})
  $('#template').change(function(){
    setTemplate($(this).val())
  })
	$('#save').click(function(){
		var dateObj = new Date();
		var month = toDoubleDigits(dateObj.getMonth() + 1);
		var day = toDoubleDigits(dateObj.getDate());
		var year = dateObj.getFullYear();
		var hours = toDoubleDigits(dateObj.getHours());
		var minutes = toDoubleDigits(dateObj.getMinutes());
		newdate = year + '_' + month + day + '_' +hours + minutes;

		var a = document.createElement('a');
	    a.download = newdate+'.html';
	    a.href = 'data:application/octet-stream,'+encodeURIComponent(editor.getValue());
	    a.click();
	})

});
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;
};

/*
 * Lazy Line Painter - Path Object
 * Generated using 'SVG to Lazy Line Converter'
 *
 * http://lazylinepainter.info
 * Copyright 2013, Cam O'Connell
 *
 */

var pathObj = {
  "logo": {
    "strokepath": [
      {
          "path": "M44.8,92.8v11.7h-35V22.2h35V33H21.4v24.3h20.5v11.1H21.4v24.3H44.8z",
          "duration": 600
      },
      {
          "path": "M88.9,22.2c5.2,0,9.8,1.9,13.6,5.6c3.8,3.7,5.7,8.2,5.7,13.5v42.8c0,5.9-1.8,10.8-5.5,14.6   c-3.6,3.8-8.4,5.7-14.2,5.7H70.3V22.2H88.9z M96.5,84.1V41.3c0-2.3-0.8-4.2-2.5-5.7c-1.7-1.5-3.6-2.3-6-2.3h-6v60.2h5.7   C93.6,93.5,96.5,90.4,96.5,84.1z",
          "duration": 600
      },
      {
          "path": "M134.9,104.5V22.2h11.7v82.2H134.9z",
          "duration": 600
      },
      {
          "path": "M183.4,104.5V33.2h-13.8V22.2h39.5v10.9h-14v71.3H183.4z",
          "duration": 600
      },
      {
          "path": "M293.8,91.7V69.2h7.4l7,22.1c4.8,0.2,9,0.9,12.9,2.1l-8.8-26.6c6.4-4,9.6-9.8,9.6-17.4    v-7.6c0-5.4-1.8-10-5.5-13.8c-3.7-3.8-8.2-5.7-13.6-5.7h-20.5v71.1C286.3,92.6,290.2,92.1,293.8,91.7z M293.8,33.2h8.4    c2.5,0,4.5,0.8,5.9,2.3c1.4,1.6,2.1,3.6,2.1,6.2v7.7c0,1.4-0.1,2.7-0.4,3.8c-0.3,1.2-0.8,2.2-1.5,3.1c-1.6,1.7-3.7,2.6-6.1,2.6    h-8.2V33.2z",
          "duration": 600
      },
      {
          "path": "M239.8,46.2c-8-3.7-13.2-10.9-11.2-18.9c3.8-16.2,23-22.9,34.5-19.8   c8,2.1,13,7.5,12.8,15.6c-0.1,5.9-2.2,10.8-8.5,14.4c-6.1,3.4-21.8-2.9-20.6-5.2c0.1-0.2,6.5-0.2,11.3-2.1c4.7-1.8,6.9-4.8,7.9-8.4   c1.6-5.8,0.1-11.1-5.3-11.8c-7.6-1.2-14.4,3.4-17.1,15.6c-1.7,7.9-0.7,15.2,3.2,18.7c3.3-0.6,6.3-0.9,8.8-0.6   c5.4,0.4,4.1,3.8-1.5,4.5c-2.7,0.2-5.3,0.2-7.9-0.1c-7.5,2.6-15.4,10-17.7,25.1c-3.4,21.9,9.8,33.3,34.3,27.2   c36.7-9.2,56.4-8.4,68.6,1.6c4.1,3.3-6.8,16.1-7.9,14.9c-12.4-15.4-32.9-18.9-64.2-11.7c-30.5,7.1-50.3-7.1-46-30.7   C216.2,59.2,228.2,50.1,239.8,46.2z",
          "duration": 1300
      }
    ],
    "dimensions": {
        "width": 340,
        "height": 120
    }
  }
};

$(document).ready(function(){
 $('#logo').lazylinepainter(
   {
      "svgData": pathObj,
      "strokeWidth": 1,
      "strokeColor": "#fff"
  }).lazylinepainter('paint');
});
