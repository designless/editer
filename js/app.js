/*
 * EDITER
 * http://editer.io
 *
 * Copyright 2015 Naoki Kanazawa, Kaito Watanabe
 *
 * Released under the MIT license - http://opensource.org/licenses/mit-license.php
 */

$(function () {
	var themelist = require("ace/ext/themelist");
	console.log(themelist)
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/girly");
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

	var currentTemplate = 'demo';

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
		var $option = $('<option>').val(theme.theme).text(theme.name).data('dark', theme.isDark).data('girl', theme.isGirl)
		$('#theme').append($option)
	});
	$('#theme').change(function(){
		editor.setTheme($(this).val());
    var selected = $(this).find('option:selected');
    var isDark = selected.data('dark');
    if (isDark){
      $('header').addClass('dark').removeClass('girly');
      $('h1 img').attr('src','images/logo.png');
    }
    if (isGirl){
      $('header').addClass('girly');
    }
    else{
      $('header').removeClass('dark');
      $('h1 img').attr('src','images/logo_black.png');
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
