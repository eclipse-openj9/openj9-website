var tracepointCounter = 0;
var methodCounter = 0;
var triggerCounter = 0;

window.onload = initialSetup();

function initialSetup() {
	document.getElementById("XtraceForm").addEventListener(                     'submit', handleSubmit);
	
	document.getElementById("button_add_tracepoint_id").addEventListener(       'click',  addTracepoint.bind(null, 'id', null));
	document.getElementById("button_add_tracepoint_component").addEventListener('click',  addTracepoint.bind(null, 'component', null));
	
	document.getElementById("disable_predefined").addEventListener(             'change', processChange.bind(null, document.getElementById("disable_predefined")));
	
	document.getElementById("button_add_method").addEventListener(              'click',  addMethod);
	document.getElementById("button_add_trigger_method").addEventListener(      'click',  addTrigger.bind(null, 'method'));
	document.getElementById("button_add_trigger_tracepoint").addEventListener(  'click',  addTrigger.bind(null, 'tracepoint'));
	document.getElementById("button_add_trigger_group").addEventListener(       'click',  addTrigger.bind(null, 'group'));

	document.getElementById("trace_initially_disabled").addEventListener(       'change', processChange.bind(null, document.getElementById("trace_initially_disabled")));
	
	document.getElementById("sleep_time").addEventListener(                     'change', processChange.bind(null, document.getElementById("sleep_time")));
	document.getElementById("sleep_time").addEventListener(                     'blur',   processChange.bind(null, document.getElementById("sleep_time")));
	
	document.getElementById("stack_depth").addEventListener(                    'change', processChange.bind(null, document.getElementById("stack_depth")));
	document.getElementById("stack_depth").addEventListener(                    'blur',   processChange.bind(null, document.getElementById("stack_depth")));
	
	document.getElementById("buffer_size").addEventListener(                    'change', processChange.bind(null, document.getElementById("buffer_size")));
	document.getElementById("dynamic_buffers").addEventListener(                'change', processChange.bind(null, document.getElementById("dynamic_buffers")));
	
	document.getElementById("wrap_in_quotes").addEventListener(                 'change', processChange.bind(null, document.getElementById("wrap_in_quotes")));
	
	document.getElementById("button_copy_to_clipboard").addEventListener(       'click',  copyTextToClipboard.bind(null, document.getElementById('result')));
	document.getElementById("button_copy_link_to_clipboard").addEventListener(  'click',  copyLinkToClipboard);
	document.getElementById("button_reset").addEventListener(                   'click',  reload);
	document.getElementById("button_clear").addEventListener(                   'click',  clearAndReload);

	var allInputs = document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; i++) {
		if (allInputs[i].id.indexOf("file_text") != -1) {
			allInputs[i].addEventListener('change', processChange.bind(null, allInputs[i]));
			allInputs[i].addEventListener('blur', processChange.bind(null, allInputs[i]));
		}
		
		if (allInputs[i].id.indexOf("file_button_") != -1) {
			allInputs[i].addEventListener('click', processChange.bind(null, allInputs[i]));
		}
		
		if (allInputs[i].id.indexOf("output_") != -1) {
			allInputs[i].addEventListener('change', processChange.bind(null, allInputs[i]));
			allInputs[i].addEventListener('blur', processChange.bind(null, allInputs[i]));
		}
	}
	
	parseParams();
}

function parseParams() {
	if (location.search != "") {
		// Get the query part of the URL, remove the leading '?', and split on '&'
		var params = location.search.substring(1).split("&"); // this includes the '?' so need to substring it

		for (var i = 0; i < params.length; i++) {
			var param = params[i].split("=");
			var key = param[0];
			var value = param[1];

			// Tracepoints
			if (key.substring(0,11) == "tracepoint_") {
				parseTracepointParam(key, value);
				continue; // Go to the next parameter
			}

			// Methods
			if (key.substring(0,7) == "method_") {
				parseMethodParam(key, value);
				continue; // Go to the next parameter
			}

			// Triggers
			if (key.substring(0,8) == "trigger_") {
				parseTriggerParam(key, value);
				continue; // Go to the next parameter
			}

			// If we reach here this is a select/input outside of a tracepoint/method/trigger
			var element = document.getElementById(key);

			// Check whether the ID was valid
			if (element == null) {
				console.log("ERROR: Key does not map to element: " + key);
				continue; // Go to the next parameter
			}

			// Select
			if (element.tagName == "SELECT") {
				if (!selectOptionByValue(element, value)) {
					console.log("ERROR: Invalid value for select element \"" + element.id + "\": " + value);
				}
				processChange(element);
				element.blur();
				continue; // Go to the next parameter
			}

			// Input
			if (element.tagName == "INPUT") {
				switch (element.type) {
					case "text":
						// id = URI encoded value
						element.value = decodeURIComponent(value);
						break;

					case "number":
						// id = value
						element.value = value;
						break;

					case "checkbox":
						// id = 0|1 (unchecked|checked)
						switch (value) {
							case "0":
								element.checked = false;
								break;

							case "1":
								element.checked = true;
								break;

							default:
								console.log("ERROR: Invalid value for checkbox element \"" + element.id + "\": " + value);
								continue; // Go to the next parameter
						}
						break;
				}

				processChange(element);
				element.blur();
				continue; // Go to the next parameter
			}
		}
	} else {
		// If no parameters were provided, just build the result with the defaults
		buildAndUpdateResult();
	}
}

// Parse a tracepoint key/value parameter pair
function parseTracepointParam(key, value) {
	var regexArray = key.match(/tracepoint_(.+)_(\d+)/)

	if (regexArray == null) {
		console.log("ERROR: Invalid tracepoint key: " + key);
		return;
	}

	var type = regexArray[1];
	var tracepointIndex = regexArray[2];

	if (type != "id" && type != "component") {
		console.log("ERROR: Invalid tracepoint type in key \"" + key + "\": " + type);
		return;
	}

	// Add the tracepoint
	addTracepoint(type, null);

	// Update the form elements
	// Decode the "value" and split it into an array of parameters
	var tracepointParams = decodeURIComponent(value).split("&");
	for (var j = 0; j < tracepointParams.length; j++) {
		var tracepointParam = tracepointParams[j].split("=");
		var tracepointKey = tracepointParam[0];
		var tracepointValue = tracepointParam[1];

		var element = document.getElementById(tracepointKey);

		// Check whether the ID was valid
		if (element == null) {
			console.log("ERROR: Key does not map to element: " + tracepointKey);
			continue; // Go to the next parameter
		}

		switch (element.tagName) {
			case "SELECT":
				// id = selected value
				if (!selectOptionByValue(element, tracepointValue)) {
					console.log("ERROR: Invalid value for select element \"" + element.id + "\": " + tracepointValue);
					continue; // Go to the next parameter
				}
				break;

			case "INPUT":
				if (element.type == "text") {
					// id = URI encoded value
					element.value = decodeURIComponent(tracepointValue);
				}
				if (element.type == "radio") {
					if (tracepointValue == 1) {
						// id = 1 (checked) (unchecked radio options are not included)
						element.checked = true;
					} else {
						console.log("ERROR: Invalid value for radio input\"" + element.id + "\": " + tracepointValue);
						continue; // Go to the next parameter
					}
				}
				if (element.type == "checkbox") {
					// id = 0|1 (unchecked|checked)
					switch (tracepointValue) {
						case "0":
							element.checked = false;
							break;

						case "1":
							element.checked = true;
							break;

						default:
							console.log("ERROR: Invalid value for checkbox element \"" + element.id + "\": " + value);
							continue; // Go to the next parameter
					}
				}
				break;
		}
		processChange(element);
		element.blur();
	}
}

// Parse a method key/value parameter pair
function parseMethodParam(key, value) {
	var regexArray = key.match(/method_(\d+)/)

	if (regexArray == null) {
		console.log("ERROR: Invalid method key: " + key);
		return;
	}

	var methodIndex = regexArray[1];

	// Add the method
	addMethod();

	// Update the form elements
	// Decode the "value" and split it into an array of parameters
	var methodParams = decodeURIComponent(value).split("&");
	for (var j = 0; j < methodParams.length; j++) {
		var methodParam = methodParams[j].split("=");
		var methodKey = methodParam[0];
		var methodValue = methodParam[1];

		var element = document.getElementById(methodKey);

		// Check whether the ID was valid
		if (element == null) {
			console.log("ERROR: Key does not map to element: " + methodKey);
			continue; // Go to the next parameter
		}

		// meth_text
		if (element.type == "text") {
			// id = URI encoded value
			element.value = decodeURIComponent(methodValue);
		}

		// meth_args
		if (element.type == "checkbox") {
			// id = 0|1 (unchecked|checked)
			switch (methodValue) {
				case "0":
					element.checked = false;
					break;

				case "1":
					element.checked = true;
					break;

				default:
					console.log("ERROR: Invalid value for checkbox element \"" + element.id + "\": " + methodValue);
					continue; // Go to the next parameter
			}
		}

		processChange(element);
		element.blur();
	}
}

// Parse a trigger key/value parameter pair
function parseTriggerParam(key, value) {
	var regexArray = key.match(/trigger_(.+)_(\d+)/)

	if (regexArray == null) {
		console.log("ERROR: Invalid trigger key: " + key);
		return;
	}

	var type = regexArray[1];
	var triggerIndex = regexArray[2];

	if (type != "method" && type != "tracepoint" && type != "group") {
		console.log("ERROR: Invalid trigger type in key \"" + key + "\": " + type);
		return;
	}

	// Add the trigger
	addTrigger(type);

	// Update the form elements
	// Decode the "value" and split it into an array of parameters
	var triggerParams = decodeURIComponent(value).split("&");
	for (var j = 0; j < triggerParams.length; j++) {
		var triggerParam = triggerParams[j].split("=");
		var triggerKey = triggerParam[0];
		var triggerValue = triggerParam[1];

		var element = document.getElementById(triggerKey);

		// Check whether the ID was valid
		if (element == null) {
			console.log("ERROR: Key does not map to element: " + triggerKey);
			continue; // Go to the next parameter
		}

		switch (element.tagName) {
			case "SELECT":
				// id = selected value
				if (!selectOptionByValue(element, triggerValue)) {
					console.log("ERROR: Invalid value for select element \"" + element.id + "\": " + triggerValue);
					continue; // Go to the next parameter
				}
				break;

			case "INPUT":
				if (element.type == "text") {
					// id = URI encoded value
					element.value = decodeURIComponent(triggerValue);
				}
				if (element.type == "number") {
					// id = value
					element.value = triggerValue;
				}
				break;
		}
		processChange(element);
		element.blur();
	}
}

function processChange(option) {
	// Ensure that only compatible tracepoint groups are enabled for the current component
	if (option.id != null && option.id.indexOf("tp_comp_select_") != -1) {
		var regexArray = option.id.match(/tp_comp_select_(\d+)/)
		var tracepointIndex = regexArray[1];
		var selectElement = document.getElementById("tp_group_select_" + tracepointIndex);

		switch(option.value) {
			case "all":
				enableAllOptions(selectElement);
				break;

			case "mt":
				disableAllOptions(selectElement);
				enableOption(selectElement, "all");
				enableOption(selectElement, "compiledmethods");
				enableOption(selectElement, "nativemethods");
				enableOption(selectElement, "staticmethods");
				break;

			case "j9jcl":
				disableAllOptions(selectElement);
				enableOption(selectElement, "all");
				enableOption(selectElement, "verboseclass");
				break;

			case "j9jit":
				disableAllOptions(selectElement);
				enableOption(selectElement, "all");
				enableOption(selectElement, "verbose");
				break;

			case "j9jni":
				disableAllOptions(selectElement);
				enableOption(selectElement, "all");
				enableOption(selectElement, "checkjni");
				break;

			case "j9mm":
				disableAllOptions(selectElement);
				enableOption(selectElement, "all");
				enableOption(selectElement, "gclogger");
				break;

			case "j9prt":
				disableAllOptions(selectElement);
				enableOption(selectElement, "all");
				enableOption(selectElement, "nlsmessage");
				break;

			case "j9vm":
				disableAllOptions(selectElement);
				enableOption(selectElement, "all");
				enableOption(selectElement, "verboseclass");
				enableOption(selectElement, "checkjni");
				enableOption(selectElement, "checkmemory");
				enableOption(selectElement, "checkvm");
				break;

			default:
				disableAllOptions(selectElement);
				break;
		}

		// If the currently selected option is now disabled, reset selection to "all"
		var selectedOptionElement = getSelectedElement(selectElement);
		if (selectedOptionElement.disabled) {
			selectedOptionElement.selected = false;
			document.getElementById("tp_group_option_all_" + tracepointIndex).selected = true;
		}

		// If all the group options are disabled, switch to "type" and disable the group option completely
		if (areAllOptionsDisabled(selectElement)) {
			// Switch to the type option and enable it, just in case it was disabled
			document.getElementById("tp_type_" + tracepointIndex).checked = true;
			enableInput(document.getElementById("tp_type_" + tracepointIndex));
			enableInput(document.getElementById("tp_type_select_" + tracepointIndex));

			// Disable the group option
			disableInput(document.getElementById("tp_group_" + tracepointIndex));
			disableInput(document.getElementById("tp_group_select_" + tracepointIndex));
		} else {
			// At least one option is enabled so enable "group", just in case it was disabled
			enableInput(document.getElementById("tp_group_" + tracepointIndex));
		}
	}

	// Enable/disable the type/group fields in a tracepoint form
	if (option.id != null && option.name.indexOf("tp_type_or_group_") != -1) {
		var regexArray = option.name.match(/tp_type_or_group_(\d+)/)
		var tracepointIndex = regexArray[1];
		if (option.value == "type") {
			if (option.checked) {
				enableInput(document.getElementById("tp_type_select_" + tracepointIndex));
				disableInput(document.getElementById("tp_group_select_" + tracepointIndex));
			}
		}

		if (option.value == "group") {
			if (option.checked) {
				enableInput(document.getElementById("tp_group_select_" + tracepointIndex));
				disableInput(document.getElementById("tp_type_select_" + tracepointIndex));
			}
		}
	}

	// If no tracepoint qualifier parameters are entered, all tracepoints are enabled,
	// except for exception.output trace, where the default is all {exception}.
	if (option.id != null && option.id.indexOf("tp_dest_select_") != -1) {
		var regexArray = option.id.match(/tp_dest_select_(\d+)/)
		var tracepointIndex = regexArray[1];
		if (option.parentNode.getAttribute("data-type") == "component") {
			if (document.getElementById("tp_dest_exception_" + tracepointIndex).selected) {
				if (document.getElementById("tp_comp_all_" + tracepointIndex).selected) {
					document.getElementById("tp_type_exception_" + tracepointIndex).selected = true;
				}
			}
		}
	}

	// Attempt to correct formatting mistakes in method text fields
	if (option.type == "text"
		&& (   option.id.indexOf("meth_text_") != -1
			|| option.id.indexOf("trig_meth_spec_") != -1) )
	{
		// Check for more than one dot in the string
		if (option.value.indexOf(".") != -1
			&& (option.value.indexOf(".") != option.value.lastIndexOf(".")) )
		{
			// Replace dots with slashes until there is only one dot left
			// This is a best effort, and isn't always going to work
			while (option.value.indexOf(".") != option.value.lastIndexOf(".")) {
				option.value = option.value.replace(".", "/");
			}
		}
		
		// Remove any whitespace
		option.value = option.value.replace(/\s/g,'');

		// Remove brackets if present
		option.value = option.value.replace(/\(|\)/g, '');
	}

	// Fix obvious mistakes in tracepoint ID fields
	if (   option.id != null
		&& (   option.id.indexOf("trig_tp_tpnid_") != -1
			|| option.id.indexOf("tp_id_") != -1) )
	{
		var result = "";
		var specs = option.value.split(",");
		for (var i = 0; i < specs.length; i++) {
			// Remove any whitespace
			var fixedSpec = specs[i].replace(/\s/g,'');

			// Fix case if necessary (see https://github.com/eclipse-openj9/openj9/issues/1254)
			fixedSpec = fixTracepointIdCase(fixedSpec);

			result += fixedSpec + ",";
		}

		// Remove any trailing commas
		while (result.length > 0 && result.lastIndexOf(",") == result.length - 1) {
			result = removeFinalCommaIfPresent(result);
		}

		option.value = result;
	}

	// Enable the disable_predefined checkbox if we are tracing to maximal or
	// exception buffers, and disabled otherwise. This is because only these two destinations
	// have tracepoints enabled by default, and we only care about them if we're tracing to
	// the same destination.
	if (isMaximalOrExceptionDestinationEnabled()) {
		enableInput(document.getElementById("disable_predefined"));
	} else {
		disableInput(document.getElementById("disable_predefined"));
	}

	// Enable/disable the tracepoint destination field
	if (option.id != null && option.name.indexOf("tp_trace_") != -1) {
		var regexArray = option.name.match(/tp_trace_(\d+)/)
		var tracepointIndex = regexArray[1];
		if (option.checked) {
			enableInput(document.getElementById("tp_dest_select_" + tracepointIndex));
		} else {
			disableInput(document.getElementById("tp_dest_select_" + tracepointIndex));
		}
	}
	
	// If there is no method tracepoint with tracing enabled, disable all method arguments checkboxes
	// Returns true if a method trace spec has been added, false otherwise
	var shouldDisable = !isMethodTracepointEnabledForTracing() && !isAllTracepointEnabledForTracing();
	for (var i = 0; i < methodCounter; i++) {
		methodArgsCheckbox = document.getElementById("meth_args_" + i)
		if (methodArgsCheckbox != null) {
			if (shouldDisable) {
				disableInput(methodArgsCheckbox);
			} else {
				enableInput(methodArgsCheckbox);
			}
		}
	}	

	// Enable the sleeptime field if a thread sleep action is selected
	if (isThreadSleepActionSelected()) {
		enableInput(document.getElementById("sleep_time"));
	} else {
		disableInput(document.getElementById("sleep_time"));
	}

	// Enable the stack depth field if a jstacktrace trigger action is selected
	if (isTracepointJStackTraceActionSelected() || isMethodJStackTraceActionSelected()) {
		enableInput(document.getElementById("stack_depth"));
	} else {
		disableInput(document.getElementById("stack_depth"));
	}

	// If this change was to select a jstacktrace trigger action, make sure
	// a suitable trace tracepoint is enabled to control the destination
	if (option.id != null
		&& (   option.id.indexOf("trig_meth_ent_") != -1
			|| option.id.indexOf("trig_meth_ex_") != -1
			|| option.id.indexOf("trig_tp_act_") != -1
			|| option.id.indexOf("trig_grp_act_") != -1) )
	{
		var regexArray = option.id.match(/_(\d+)/)
		var triggerIndex = regexArray[1];
		var selectedElement = getSelectedElement(document.getElementById(option.id));
		if (selectedElement.id.indexOf("jstacktrace") != -1) {
				if (option.id.indexOf("trig_tp_act_") != -1) {
				// This is a tracepoint ID trigger
				var triggerTracepointId = document.getElementById("trig_tp_tpnid_" + triggerIndex).value;
				if (!isIdTracepointEnabledForTracing(triggerTracepointId) && !isAllTracepointEnabledForTracing()) {
					addTracepoint("id", null);
					var newTracepointElement = document.getElementById("tp_id_" + (tracepointCounter - 1));
					newTracepointElement.value = triggerTracepointId;
				}
			} else {
				// This is a method trigger
				if (!isMethodTracepointEnabledForTracing() && !isAllTracepointEnabledForTracing()) {
					addTracepoint("component", "mt");
				}
			}
		}
	}

	// If a tracepoint action or method trigger action is set to start tracing, and
	// no trigger actions stop tracing, automatically disable tracing at startup
	if (option.id != null
		&& (   option.id.indexOf("trig_meth_ex_") != -1
			|| option.id.indexOf("trig_meth_ent_") != -1
			|| option.id.indexOf("trig_tp_act_") != -1
			|| option.id.indexOf("trig_grp_act_") != -1) )
	{
		var selectedElement = getSelectedElement(document.getElementById(option.id));
		if (selectedElement.id.indexOf("resume") != -1 && !isTriggerActionSelected("suspend") && !isTriggerActionSelected("suspendthis")) {
			document.getElementById("trace_initially_disabled").checked = true;
		}
	}

	// If one of the token buttons is pressed, add the token to the text input
	if (option.type == "button" && option.getAttribute("data-target") != null) {
		insertText(document.getElementById(option.getAttribute("data-target")), option.getAttribute("data-token"));
	}

	// Remove focus from input element (ensures error styling works correctly)
	if (option.id != null) {
		option.blur();
	}

	// Check which destinations are selected and enable/disable output forms accordingly
	checkOutputForms();

	// Build the result string and display it
	buildAndUpdateResult();
}

// Checks which destinations are enabled, and enables/disables output forms accordingly
function checkOutputForms() {
	var needOutputForm = false;
	var needExceptionOutputForm = false;

	for (var i = 0; i < tracepointCounter; i++) {
		var destinationSelectElement = document.getElementById("tp_dest_select_" + i)
		if (destinationSelectElement != null && !destinationSelectElement.disabled) {
			var destination = getSelectedElement(destinationSelectElement).value;
			switch (getSelectedElement(destinationSelectElement).value) {
				case "minimal":
				case "maximal":
					needOutputForm = true;
					break;

				case "exception":
					needExceptionOutputForm = true;
					break;

				default:
					break;
			}
		}
	}

	if (needOutputForm) {
		enableInput(document.getElementById("file_text"));
		enableInput(document.getElementById("output_size"));
		enableInput(document.getElementById("output_generations"));
	} else {
		disableInput(document.getElementById("file_text"));
		disableInput(document.getElementById("output_size"));
		disableInput(document.getElementById("output_generations"));
	}

	if (needExceptionOutputForm) {
		enableInput(document.getElementById("file_text_exception"));
		enableInput(document.getElementById("output_size_exception"));
	} else {
		disableInput(document.getElementById("file_text_exception"));
		disableInput(document.getElementById("output_size_exception"));
	}

	if (needOutputForm || needExceptionOutputForm) {
		enableInput(document.getElementById("buffer_size"));
		enableInput(document.getElementById("buffer_size_units"));
	} else {
		disableInput(document.getElementById("buffer_size"));
		disableInput(document.getElementById("buffer_size_units"));
	}

	// The dynamic buffers option only applies when tracing to a file
	// TODO: Doc is not 100% clear - does this definitely apply for output AND exception.output?
	if ((needOutputForm && isOutputFileSpecified())
		|| (needExceptionOutputForm && isExceptionOutputFileSpecified) )
	{
		enableInput(document.getElementById("dynamic_buffers"));
	} else {
		disableInput(document.getElementById("dynamic_buffers"));
	}
}

function addTracepoint(type, defaultComponent) {
	var tracepointList = document.getElementById("tracepoint_input");
	var newTracepoint = document.createElement("li");
	newTracepoint.setAttribute("id", "tracepoint_" + tracepointCounter);
	newTracepoint.setAttribute("data-type", type);

	newTracepoint.innerHTML =
		'<a href="#" title="Remove tracepoint" class="remove" id="remove_tracepoint_' + tracepointCounter + '">&#x274C</a>' +
		'&nbsp;&nbsp;' +
		'<select id="tp_dest_select_' + tracepointCounter + '">' +
		'    <option id="tp_dest_maximal_'   + tracepointCounter + '"  value="maximal"  selected >Trace to buffers (maximal)</option>' +
		'    <option id="tp_dest_minimal_'   + tracepointCounter + '"  value="minimal"           >Trace to buffers (minimal)</option>' +
		'    <option id="tp_dest_count_'     + tracepointCounter + '"  value="count"             >Trace to buffers (count only)</option>' +
		'    <option id="tp_dest_exception_' + tracepointCounter + '"  value="exception"         >Trace to Exception buffers</option>' +
		'    <option id="tp_dest_print_'     + tracepointCounter + '"  value="print"             >Trace to STDERR (standard)</option>' +
		'    <option id="tp_dest_iprint_'    + tracepointCounter + '"  value="iprint"            >Trace to STDERR (indented)</option>' +
		'    <option id="tp_dest_external_'  + tracepointCounter + '"  value="external"          >Trace to external receiver</option>' +
		'    <option id="tp_dest_none_'      + tracepointCounter + '"  value="none"              >None (disable tracepoint)</option>' +
		'</select>' +
		'&nbsp;&nbsp;';

	if (type == "id") {
		newTracepoint.innerHTML +=
			'<label for="tp_id_' + tracepointCounter + '">Tracepoint <a href="https://www.ibm.com/support/knowledgecenter/en/SSYKE2_8.0.0/com.ibm.java.lnx.80.doc/diag/tools/trace_tracepoint.html#trace_tracepoint">ID</a>:&nbsp;</label>' +
			'<input type="text" id="tp_id_' + tracepointCounter + '" name="tp_id_' + tracepointCounter + '" size="10" value="">' +
			'&nbsp;&nbsp;';
	}

	if (type == "component") {
		newTracepoint.innerHTML +=
			'<select id="tp_comp_select_'         + tracepointCounter + '">' +
			'    <option id="tp_comp_all_'        + tracepointCounter + '" value="all" selected >All components</option>' +
			'    <option id="tp_comp_mt_'         + tracepointCounter + '" value="mt"           >Methods / Stacks (see below)</option>' +
			' 	 <option id="tp_comp_ibm_gpu_'    + tracepointCounter + '" value="ibm_gpu"      >JCL - GPU</option>' +
			'  	 <option id="tp_comp_io_'         + tracepointCounter + '" value="io"           >JCL - IO</option>' +
			'  	 <option id="tp_comp_JSOR_'       + tracepointCounter + '" value="JSOR"         >JCL - JSOR</option>' +
			'  	 <option id="tp_comp_JVERBS_'     + tracepointCounter + '" value="JVERBS"       >JCL - jVERBS</option>' +
			'  	 <option id="tp_comp_net_'        + tracepointCounter + '" value="net"          >JCL - TCP/IP</option>' +
			'    <option id="tp_comp_j9vm_'       + tracepointCounter + '" value="j9vm"         >JVM - General</option>' +
			'    <option id="tp_comp_avl_'        + tracepointCounter + '" value="avl"          >JVM - AVL</option>' +
			'  	 <option id="tp_comp_j9bcu_'      + tracepointCounter + '" value="j9bcu"        >JVM - Bytecode utilities</option>' +
			'  	 <option id="tp_comp_j9bcverify_' + tracepointCounter + '" value="j9bcverify"   >JVM - Bytecode verifier</option>' +
			'  	 <option id="tp_comp_j9codertvm_' + tracepointCounter + '" value="j9codertvm"   >JVM - Bytecode runtime</option>' +
			'  	 <option id="tp_comp_j9dmp_'      + tracepointCounter + '" value="j9dmp"        >JVM - Dump</option>' +
			'  	 <option id="tp_comp_j9jcl_'      + tracepointCounter + '" value="j9jcl"        >JVM - JCL</option>' +
			'  	 <option id="tp_comp_sunvmi_'     + tracepointCounter + '" value="sunvmi"       >JVM - JCL interface (sunvmi)</option>' +
			'  	 <option id="tp_comp_j9scar_'     + tracepointCounter + '" value="j9scar"       >JVM - JCL interface (j9scar)</option>' + // TODO: difference between this and option above?
			'  	 <option id="tp_comp_j9jit_'      + tracepointCounter + '" value="j9jit"        >JVM - JIT interface</option>' +
			'  	 <option id="tp_comp_j9jni_'      + tracepointCounter + '" value="j9jni"        >JVM - JNI</option>' +
			'  	 <option id="tp_comp_j9jvmti_'    + tracepointCounter + '" value="j9jvmti"      >JVM - JVMTI</option>' +
			'  	 <option id="tp_comp_j9mm_'       + tracepointCounter + '" value="j9mm"         >JVM - Memory management</option>' +
			'  	 <option id="tp_comp_map_'        + tracepointCounter + '" value="map"          >JVM - Memory mapping</option>' +
			'  	 <option id="tp_comp_j9prt_'      + tracepointCounter + '" value="j9prt"        >JVM - Port library</option>' +
			'  	 <option id="tp_comp_rpc_'        + tracepointCounter + '" value="rpc"          >JVM - RPC</option>' +
			'  	 <option id="tp_comp_j9shr_'      + tracepointCounter + '" value="j9shr"        >JVM - Shared classes</option>' +
			'    <option id="tp_comp_j9vrb_'      + tracepointCounter + '" value="j9vrb"        >JVM - Stack walker</option>' +
			'  	 <option id="tp_comp_pool_'       + tracepointCounter + '" value="pool"         >JVM - Storage pool</option>' +
			'  	 <option id="tp_comp_simplepool_' + tracepointCounter + '" value="simplepool"   >JVM - Storage pool (simple)</option>' +
			'  	 <option id="tp_comp_j9trc_'      + tracepointCounter + '" value="j9trc"        >JVM - Trace engine</option>' +
			'    <option id="tp_comp_j9util_'     + tracepointCounter + '" value="j9util"       >JVM - Utilities (j9util)</option>' + // TODO: what is the difference between this and j9vmutil?
			'    <option id="tp_comp_j9vmutil_'   + tracepointCounter + '" value="j9vmutil"     >JVM - Utilities (j9vmutil)</option>' +
			'</select>' +
			'&nbsp;&nbsp;' +
			'<select id="tp_level_select_' + tracepointCounter + '">' +
			'    <option id="tp_level_9_'       + tracepointCounter + '" value="9" selected >Level 9</option>' +
			'    <option id="tp_level_8_'       + tracepointCounter + '" value="8"          >Level 8</option>' +
			'    <option id="tp_level_7_'       + tracepointCounter + '" value="7"          >Level 7</option>' +
			'    <option id="tp_level_6_'       + tracepointCounter + '" value="6"          >Level 6</option>' +
			'    <option id="tp_level_5_'       + tracepointCounter + '" value="5"          >Level 5</option>' +
			'    <option id="tp_level_4_'       + tracepointCounter + '" value="4"          >Level 4</option>' +
			'    <option id="tp_level_3_'       + tracepointCounter + '" value="3"          >Level 3</option>' +
			'    <option id="tp_level_2_'       + tracepointCounter + '" value="2"          >Level 2</option>' +
			'    <option id="tp_level_1_'       + tracepointCounter + '" value="1"          >Level 1</option>' +
			'    <option id="tp_level_0_'       + tracepointCounter + '" value="0"          >Level 0</option>' +
			'</select>' +
			'&nbsp;&nbsp;' +
			'<input type="radio" id="tp_type_' + tracepointCounter + '" name="tp_type_or_group_' + tracepointCounter + '" value="type" checked>' +
			'    <select id="tp_type_select_' + tracepointCounter + '">' +
			'        <option id="tp_type_all_'       + tracepointCounter + '" value="all" selected >All types</option>' +
			'        <option id="tp_type_entry_'     + tracepointCounter + '" value="entry"        >Entry</option>' +
			'        <option id="tp_type_exit_'      + tracepointCounter + '" value="exit"         >Exit</option>' +
			'        <option id="tp_type_event_'     + tracepointCounter + '" value="event"        >Event</option>' +
			'        <option id="tp_type_exception_' + tracepointCounter + '" value="exception"    >Exception</option>' +
			'        <option id="tp_type_mem_'       + tracepointCounter + '" value="mem"          >Memory</option>' +
			'    </select>' +
			'</input>' +
			'&nbsp;&nbsp;' +
			'<input type="radio" id="tp_group_' + tracepointCounter + '" name="tp_type_or_group_' + tracepointCounter + '" value="group">' +
			'    <select id="tp_group_select_' + tracepointCounter + '" disabled>' +
			'        <option id="tp_group_option_all_'             + tracepointCounter + '" value="all" selected    >All applicable groups</option>' +
			'        <option id="tp_group_option_gclogger_'        + tracepointCounter + '" value="gclogger"        >GC logger</option>' +
			'        <option id="tp_group_option_nlsmessage_'      + tracepointCounter + '" value="nlsmessage"      >NLS messages</option>' +
			'        <option id="tp_group_option_verboseclass_'    + tracepointCounter + '" value="verboseclass"    >Verbose:class</option>' +
			'        <option id="tp_group_option_checkjni_'        + tracepointCounter + '" value="checkjni"        >Check:JNI</option>' +
			'        <option id="tp_group_option_checkmemory_'     + tracepointCounter + '" value="checkmemory"     >Check:memory</option>' +
			'        <option id="tp_group_option_checkvm_'         + tracepointCounter + '" value="checkvm"         >Check:VM</option>' +
			'        <option id="tp_group_option_verbose_'         + tracepointCounter + '" value="verbose"         >Verbose</option>' +
			'        <option id="tp_group_option_compiledmethods_' + tracepointCounter + '" value="compiledmethods" >Compiled methods</option>' +
			'        <option id="tp_group_option_nativemethods_'   + tracepointCounter + '" value="nativemethods"   >Native methods</option>' +
			'        <option id="tp_group_option_staticmethods_'   + tracepointCounter + '" value="staticmethods"   >Static methods</option>' +
			'    </select>' +
			'</input>' +
			'&nbsp;&nbsp;';
	}

	// Trace option
	newTracepoint.innerHTML +=
		'<span title="Enable tracepoint tracing">' +
		'<input type="checkbox" id="tp_trace_' + tracepointCounter + '" name="tp_trace_' + tracepointCounter + '" value="tp_trace_' + tracepointCounter + '" checked>' +
		'<label for="tp_trace_' + tracepointCounter + '" title="Enable tracepoint tracing">&nbsp;Trace</a></label>' +
		'</span>' +
		'&nbsp;&nbsp;';

	// Count option
	newTracepoint.innerHTML +=
		'<span title="Enable tracepoint counting">' +
		'<input type="checkbox" id="tp_count_' + tracepointCounter + '" name="tp_count_' + tracepointCounter + '" value="tp_count_' + tracepointCounter + '">' +
		'<label for="tp_count_' + tracepointCounter + '">&nbsp;<a href="https://www.eclipse.org/openj9/docs/xtrace/#count-tracepoint">Count</a></label>' +
		'</span>';

	tracepointList.appendChild(newTracepoint);
	
	// Tooltip: Trace Destination field
	var tooltipText = "Trace Destination\n" +
		"\n" +
		"Trace buffers:\n" +
		"    - can be continually written to one or more files (see \"Regular output file\" field)\n" +
		"    - can be \"snapped\" to a file (known as a \"snap trace\" or \"snap dump\")\n" +
		"\n" +
		"Exception buffers:\n" +
		"    - *must* be continually written to a file (see \"Exception output file\" field)";
	document.getElementById("tp_dest_select_" + tracepointCounter).title = tooltipText;

	// Event listeners for trace destination and tracepoint removal
	document.getElementById("tp_dest_select_" + tracepointCounter).addEventListener('change', processChange.bind(null, document.getElementById("tp_dest_select_" + tracepointCounter)));
	document.getElementById("remove_tracepoint_" + tracepointCounter).addEventListener('click', removeTracepoint.bind(null, tracepointCounter));
	
	if (type == "id") {
		idInputElement = document.getElementById("tp_id_" + tracepointCounter);
		
		// Event listeners
		idInputElement.addEventListener('change', processChange.bind(null, idInputElement));
		idInputElement.addEventListener('blur', processChange.bind(null, idInputElement));

		// Tooltip: ID field
		tooltipText = "Examples:\n" +
			"    - j9prt.5\n" +
			"    - j9prt.5-15\n" +
			"    - j9prt.5-15,j9vm.12\n";
		idInputElement.title = tooltipText;

		// Give focus to the id field
		idInputElement.focus();
	}

	if (type == "component") {
		compSelectElement = document.getElementById("tp_comp_select_" + tracepointCounter);
		levelSelectElement = document.getElementById("tp_level_select_" + tracepointCounter);
		typeElement = document.getElementById("tp_type_" + tracepointCounter);
		typeSelectElement = document.getElementById("tp_type_select_" + tracepointCounter);
		groupElement = document.getElementById("tp_group_" + tracepointCounter);
		groupSelectElement = document.getElementById("tp_group_select_" + tracepointCounter);
		
		// Event listeners
		compSelectElement.addEventListener('change', processChange.bind(null, compSelectElement));
		levelSelectElement.addEventListener('change', processChange.bind(null, levelSelectElement));
		typeElement.addEventListener('change', processChange.bind(null, typeElement));
		typeSelectElement.addEventListener('change', processChange.bind(null, typeSelectElement));
		groupElement.addEventListener('change', processChange.bind(null, groupElement));
		groupSelectElement.addEventListener('change', processChange.bind(null, groupSelectElement));
			
		// Tooltip: Component field
		tooltipText = "Component to trace";
		compSelectElement.title = tooltipText;

		// Tooltip: Level field
		tooltipText = "A Level 0 tracepoint is the most important. It is reserved for extraordinary\n" +
			"events and errors. A Level 9 tracepoint is in-depth component detail.\n" +
			"\n" +
			"Example: if Level 5 is selected, tracepoints with Levels from 0 to 5 are included.";
		levelSelectElement.title = tooltipText;

		// Tooltip: Type field
		tooltipText = "Tracepoint type";
		typeSelectElement.title = tooltipText;

		// Tooltip: Group field
		tooltipText = "Tracepoint group";
		groupSelectElement.title = tooltipText;
	}

	if (type == "component" && defaultComponent != null) {
		// Select the specified component
		document.getElementById("tp_comp_" + defaultComponent + "_" + tracepointCounter).selected = true;
		// Call processChange against the component select element to ensure that the
		// correct options are shown in the group select field
		processChange(document.getElementById("tp_comp_select_" + tracepointCounter));
	}

	// Event listener for Trace checkbox
	var traceCheckboxElement = document.getElementById("tp_trace_" + tracepointCounter)
	traceCheckboxElement.addEventListener('change', processChange.bind(null, traceCheckboxElement));	

	// Event listener for Count checkbox
	var countCheckboxElement = document.getElementById("tp_count_" + tracepointCounter)
	countCheckboxElement.addEventListener('change', processChange.bind(null, countCheckboxElement));

	tracepointCounter++;
	processChange("none");
}

function removeTracepoint(tracepointIndex) {
	var tracepoint = document.getElementById("tracepoint_" + tracepointIndex);
	tracepoint.parentNode.removeChild(tracepoint);
	processChange("none");
}

function addMethod() {
	// If no method trace tracepoint is enabled, add one
	if (!isMethodTracepointEnabledForTracing() && !isAllTracepointEnabledForTracing()) {
		addTracepoint("component", "mt");
	}

	// Add a method form
	var newMethod = document.createElement("li");
	newMethod.setAttribute("id", "method_" + methodCounter);
	newMethod.innerHTML =
		'<a href="#" title="Remove method" class="remove" id="remove_method_' + methodCounter + '">&#x274C</a>' +
		'&nbsp;&nbsp;' +
		'<label for="meth_text_' + methodCounter + '">Method:&nbsp;</label>' +
		'<input type="text" id="meth_text_' + methodCounter + '" name="meth_text_' + methodCounter + '" size="25" value="">' +
		'&nbsp;&nbsp;' +
		'<span title="This option will only work for interpreted methods. Use a JIT exclude if necessary.">' +
		'<input type="checkbox" id="meth_args_' + methodCounter + '" name="meth_args_' + methodCounter + '" value="meth_args_' + methodCounter + '" checked>' +
		'<label for="meth_args_' + methodCounter + '">&nbsp;Trace arguments and return values</label>' +
		'</span>';

	var methodList = document.getElementById("method_input");
	methodList.appendChild(newMethod);
	
	var methodRemoveElement = document.getElementById("remove_method_" + methodCounter);
	var methodTextElement = document.getElementById("meth_text_" + methodCounter);
	var methodArgsElement = document.getElementById("meth_args_" + methodCounter);
	
	// Event listeners
	methodRemoveElement.addEventListener('click', removeMethod.bind(null, methodCounter));
	methodTextElement.addEventListener('change', processChange.bind(null, methodTextElement));
	methodTextElement.addEventListener('blur', processChange.bind(null, methodTextElement));
	methodArgsElement.addEventListener('click', processChange.bind(null, methodArgsElement));

	// Tooltip: Method Specification
	var tooltipText = "Examples:\n" +
		"    - java/lang/String.indexOf\n" +
		"    - java/nio/ByteBuffer.*\n" +
		"    - java/util/*.*\n" +
		"    - *.readObject\n" +
		"    - *.*\n" +
		"\n" +
		"Wildcards are allowed at the beginning and/or end of the class name and method name.\n" +
		"Note that method parameters cannot be specified.\n" +
		"All methods matching the specified name will be traced.";
	methodTextElement.title = tooltipText;

	// Give focus to text field
	methodTextElement.focus();

	methodCounter++;
	processChange("none");
}

function removeMethod(methodIndex) {
	var method = document.getElementById("method_" + methodIndex);
	method.parentNode.removeChild(method);
	processChange("none");
}

function addTrigger(type) {
	var triggerList = document.getElementById("trigger_input");
	var newTrigger = document.createElement("li");
	newTrigger.setAttribute("id", "trigger_" + triggerCounter);
	newTrigger.setAttribute("data-type", type);

	newTrigger.innerHTML =
		'<a href="#" title="Remove trigger" class="remove" id="remove_trigger_' + triggerCounter + '">&#x274C</a>' +
		'&nbsp;&nbsp;';

	if (type == "method") {
		// method{<methodspec>[,<entryAction>[,<exitAction>[,<delayCount>[,<matchcount>]]]]}
		newTrigger.innerHTML +=
			'<label for="trig_meth_spec_' + triggerCounter + '">Method:&nbsp;</label>' +
			'<input type="text" id="trig_meth_spec_' + triggerCounter +'" name="trig_meth_spec_1" size="25" value="">' +
			'&nbsp;&nbsp;' +
			'<label for="trig_meth_ent_' + triggerCounter + '">Entry:&nbsp;</label>' +
			'<select id="trig_meth_ent_' + triggerCounter + '">' +
			'    <option id="trig_meth_ent_none_'        + triggerCounter +'" value="none"        >No action</option>' +
			'    <option id="trig_meth_ent_javadump_'    + triggerCounter +'" value="javadump"    >Javacore</option>' +
			'    <option id="trig_meth_ent_sysdump_'     + triggerCounter +'" value="sysdump"     >System dump (core file)</option>' +
			'    <option id="trig_meth_ent_heapdump_'    + triggerCounter +'" value="heapdump"    >Heap dump</option>' +
			'    <option id="trig_meth_ent_snap_'        + triggerCounter +'" value="snap"        >Snap trace</option>' +
			'    <option id="trig_meth_ent_jstacktrace_' + triggerCounter +'" value="jstacktrace" >Java stacktrace</option>' +
			'    <option id="trig_meth_ent_resumethis_'  + triggerCounter +'" value="resumethis"  >Start trace (current thread)</option>' +
			'    <option id="trig_meth_ent_suspendthis_' + triggerCounter +'" value="suspendthis" >Stop trace (current thread)</option>' +
			'    <option id="trig_meth_ent_resume_'      + triggerCounter +'" value="resume"      >Start trace (all threads)</option>' +
			'    <option id="trig_meth_ent_suspend_'     + triggerCounter +'" value="suspend"     >Stop trace (all threads)</option>' +
			'    <option id="trig_meth_ent_sleep_'       + triggerCounter +'" value="sleep"       >Thread sleep</option>' +
			'    <option id="trig_meth_ent_segv_'        + triggerCounter +'" value="segv"        >SIGSEGV/GPF</option>' +
			'    <option id="trig_meth_ent_abort_'       + triggerCounter +'" value="abort"       >Abort</option>' +
			'</select>' +
			'&nbsp;&nbsp;' +
			'<label for="trig_meth_ex_' + triggerCounter + '">Exit:&nbsp;</label>' +
			'<select id="trig_meth_ex_' + triggerCounter + '">' +
			'    <option id="trig_meth_ex_none_'        + triggerCounter +'" value="none"        >No action</option>' +
			'    <option id="trig_meth_ex_javadump_'    + triggerCounter +'" value="javadump"    >Javacore</option>' +
			'    <option id="trig_meth_ex_sysdump_'     + triggerCounter +'" value="sysdump"     >System dump (core file)</option>' +
			'    <option id="trig_meth_ex_heapdump_'    + triggerCounter +'" value="heapdump"    >Heap dump</option>' +
			'    <option id="trig_meth_ex_snap_'        + triggerCounter +'" value="snap"        >Snap trace</option>' +
			'    <option id="trig_meth_ex_jstacktrace_' + triggerCounter +'" value="jstacktrace" >Java stacktrace</option>' +
			'    <option id="trig_meth_ex_resumethis_'  + triggerCounter +'" value="resumethis"  >Start trace (current thread)</option>' +
			'    <option id="trig_meth_ex_suspendthis_' + triggerCounter +'" value="suspendthis" >Stop trace (current thread)</option>' +
			'    <option id="trig_meth_ex_resume_'      + triggerCounter +'" value="resume"      >Start trace (all threads)</option>' +
			'    <option id="trig_meth_ex_suspend_'     + triggerCounter +'" value="suspend"     >Stop trace (all threads)</option>' +
			'    <option id="trig_meth_ex_sleep_'       + triggerCounter +'" value="sleep"       >Thread sleep</option>' + <!-- TODO: sleeptime -->
			'    <option id="trig_meth_ex_segv_'        + triggerCounter +'" value="segv"        >SIGSEGV/GPF</option>' +
			'    <option id="trig_meth_ex_abort_'       + triggerCounter +'" value="abort"       >Abort</option>' +
			'</select>' +
			'&nbsp;&nbsp;';
	}

	if (type == "tracepoint") {
		// tpnid{<tpnid>|<tpnidRange>,<action>[,<delayCount>[,<matchcount>]]}
		newTrigger.innerHTML +=
			'<label for "trig_tp_tpnid_' + tracepointCounter + '">Tracepoint <a href="https://www.ibm.com/support/knowledgecenter/en/SSYKE2_8.0.0/com.ibm.java.lnx.80.doc/diag/tools/trace_tracepoint.html#trace_tracepoint">ID</a>:&nbsp;</label>' +
			'<input type="text" id="trig_tp_tpnid_'        + triggerCounter +'" name="trig_tp_tpnid_1" size="10" value="">' +
			'&nbsp;&nbsp;' +
			'<select id="trig_tp_act_' + triggerCounter + '">' +
			'    <option id="trig_tp_act_none_'        + triggerCounter +'" value="none"        >No action</option>' +
			'    <option id="trig_tp_act_javadump_'    + triggerCounter +'" value="javadump"    >Javacore</option>' +
			'    <option id="trig_tp_act_sysdump_'     + triggerCounter +'" value="sysdump"     >System dump (core file)</option>' +
			'    <option id="trig_tp_act_heapdump_'    + triggerCounter +'" value="heapdump"    >Heap dump</option>' +
			'    <option id="trig_tp_act_snap_'        + triggerCounter +'" value="snap"        >Snap trace</option>' +
			'    <option id="trig_tp_act_jstacktrace_' + triggerCounter +'" value="jstacktrace" >Java stacktrace</option>' +
			'    <option id="trig_tp_act_resumethis_'  + triggerCounter +'" value="resumethis"  >Start trace (current thread)</option>' +
			'    <option id="trig_tp_act_suspendthis_' + triggerCounter +'" value="suspendthis" >Stop trace (current thread)</option>' +
			'    <option id="trig_tp_act_resume_'      + triggerCounter +'" value="resume"      >Start trace (all threads)</option>' +
			'    <option id="trig_tp_act_suspend_'     + triggerCounter +'" value="suspend"     >Stop trace (all threads)</option>' +
			'    <option id="trig_tp_act_sleep_'       + triggerCounter +'" value="sleep"       >Thread sleep</option>' + <!-- TODO: sleeptime -->
			'    <option id="trig_tp_act_segv_'        + triggerCounter +'" value="segv"        >SIGSEGV/GPF</option>' +
			'    <option id="trig_tp_act_abort_'       + triggerCounter +'" value="abort"       >Abort</option>' +
			'</select>' +
			'&nbsp;&nbsp;';
	}

	if (type == "group") {
		// group{<groupname>,<action>[,<delayCount>[,<matchcount>]]}
		newTrigger.innerHTML +=
			'<label for "trig_grp_name_' + tracepointCounter + '">Tracepoint group:&nbsp;</label>' +
			'<select id="trig_grp_name_' + triggerCounter + '">' +
			'    <option id="trig_grp_name_gclogger_'        + triggerCounter + '" value="gclogger"        >GC Logger</option>' +
			'    <option id="trig_grp_name_nlsmessage_'      + triggerCounter + '" value="nlsmessage"      >NLS Messages</option>' +
			'    <option id="trig_grp_name_verboseclass_'    + triggerCounter + '" value="verboseclass"    >Verbose:class</option>' +
			'    <option id="trig_grp_name_checkjni_'        + triggerCounter + '" value="checkjni"        >Check:JNI</option>' +
			'    <option id="trig_grp_name_checkmemory_'     + triggerCounter + '" value="checkmemory"     >Check:memory</option>' +' +' +
			'    <option id="trig_grp_name_checkvm_'         + triggerCounter + '" value="checkvm"         >Check:VM</option>' +
			'    <option id="trig_grp_name_verbose_'         + triggerCounter + '" value="verbose"         >Verbose</option>' +
			'    <option id="trig_grp_name_compiledmethods_' + triggerCounter + '" value="compiledmethods" >Compiled methods</option>' +
			'    <option id="trig_grp_name_nativemethods_'   + triggerCounter + '" value="nativemethods"   >Native methods</option>' +
			'    <option id="trig_grp_name_staticmethods_'   + triggerCounter + '" value="staticmethods"   >Static methods</option>' +
			'</select>' +
			'&nbsp;&nbsp;' +
			'<select id="trig_grp_act_' + triggerCounter + '">' +
			'    <option id="trig_grp_act_none_'        + triggerCounter + '" value="none"        >No action</option>' +
			'    <option id="trig_grp_act_javadump_'    + triggerCounter + '" value="javadump"    >Javacore</option>' +
			'    <option id="trig_grp_act_sysdump_'     + triggerCounter + '" value="sysdump"     >System dump (core file)</option>' +
			'    <option id="trig_grp_act_heapdump_'    + triggerCounter + '" value="heapdump"    >Heap dump</option>' +
			'    <option id="trig_grp_act_snap_'        + triggerCounter + '" value="snap"        >Snap trace</option>' +
			'    <option id="trig_grp_act_jstacktrace_' + triggerCounter + '" value="jstacktrace" >Java stacktrace</option>' +
			'    <option id="trig_grp_act_resumethis_'  + triggerCounter + '" value="resumethis"  >Start trace (current thread)</option>' +
			'    <option id="trig_grp_act_suspendthis_' + triggerCounter + '" value="suspendthis" >Stop trace (current thread)</option>' +
			'    <option id="trig_grp_act_resume_'      + triggerCounter + '" value="resume"      >Start trace (all threads)</option>' +
			'    <option id="trig_grp_act_suspend_'     + triggerCounter + '" value="suspend"     >Stop trace (all threads)</option>' +
			'    <option id="trig_grp_act_sleep_'       + triggerCounter + '" value="sleep"       >Thread sleep</option>' + <!-- TODO: sleeptime -->
			'    <option id="trig_grp_act_segv_'        + triggerCounter + '" value="segv"        >SIGSEGV/GPF</option>' +
			'    <option id="trig_grp_act_abort_'       + triggerCounter + '" value="abort"       >Abort</option>' +
			'</select>' +
			'&nbsp;&nbsp;';
	}

	// Add delay and match/limit fields
	newTrigger.innerHTML +=
		'<label for "trig_delay_' + triggerCounter + '">Delay:&nbsp;</label>' +
		'<input type="number" id="trig_delay_' + triggerCounter + '" min="0" max="9999" value="0" size="4">' +
		'&nbsp;&nbsp;' +
		'<label for "trig_match_' + triggerCounter + '">Limit:&nbsp;</label>' +
		'<input type="number" id="trig_match_' + triggerCounter + '" min="0" max="9999" value="0" size="4">';

	triggerList.appendChild(newTrigger);
	
	// Event listener for trigger removal
	document.getElementById("remove_trigger_" + triggerCounter).addEventListener('click', removeTrigger.bind(null, triggerCounter));

	if (type == "method") {
		methodSpecElement = document.getElementById("trig_meth_spec_" + triggerCounter);
		methodEntryElement = document.getElementById("trig_meth_ent_" + triggerCounter);
		methodExitElement = document.getElementById("trig_meth_ex_" + triggerCounter);
		
		// Event listeners
		methodSpecElement.addEventListener('change', processChange.bind(null, methodSpecElement));
		methodSpecElement.addEventListener('blur', processChange.bind(null, methodSpecElement));
		methodEntryElement.addEventListener('change', processChange.bind(null, methodEntryElement));
		methodExitElement.addEventListener('change', processChange.bind(null, methodExitElement));
		
		// Tooltip: Method Specification
		var tooltipText = "Examples:\n" +
			"    - java/lang/String.indexOf\n" +
			"    - java/nio/ByteBuffer.*\n" +
			"    - java/util/*.*\n" +
			"    - MyClass.*\n" +
			"    - *.*\n" +
			"\n" +
			"Wildcards are allowed at the beginning and/or end of the class name and method name.\n" +
			"Note that method parameters cannot be specified.\n" +
			"All methods matching the specified name will fire the trigger.";
		methodSpecElement.title = tooltipText;

		// Tooltip: Entry/Exit actions
		methodEntryElement.title = "Action to perform when entering a matching method";
		methodExitElement.title = "Action to perform when exiting a matching method";

		// Give focus to method spec field
		methodSpecElement.focus();
	}
	
	if (type == "tracepoint") {
		tpnidElement = document.getElementById("trig_tp_tpnid_" + triggerCounter);
		actElement = document.getElementById("trig_tp_act_" + triggerCounter);

		// Event Listeners
		tpnidElement.addEventListener('change', processChange.bind(null, tpnidElement));
		tpnidElement.addEventListener('blur', processChange.bind(null, tpnidElement));
		actElement.addEventListener('change', processChange.bind(null, actElement));
		
		// Tooltip: Tracepoint ID
		var tooltipText = "Examples:\n" +
			"    - j9prt.5\n" +
			"    - j9prt.5-15\n";
		tpnidElement.title = tooltipText;

		// Tooltip: Action
		actElement.title = "Action to perform when a matching tracepoint is encountered";

		// Give focus to tpnid field
		tpnidElement.focus();
	}

	if (type == "group") {
		groupNameElement = document.getElementById("trig_grp_name_" + triggerCounter);
		actionElement = document.getElementById("trig_grp_act_" + triggerCounter);
		
		// Event Listeners
		groupNameElement.addEventListener('change', processChange.bind(null, groupNameElement));
		actionElement.addEventListener('change', processChange.bind(null, actionElement));
		
		// Tooltip: Group Name
		groupNameElement.title = "Tracepoint group";

		// Tooltip: Action
		actionElement.title = "Action to perform when a tracepoint from the specified group is encountered";
	}

	delayElement = document.getElementById("trig_delay_" + triggerCounter);
	matchElement = document.getElementById("trig_match_" + triggerCounter);
	
	// Event listeners
	delayElement.addEventListener('change', processChange.bind(null, delayElement));
	delayElement.addEventListener('blur', processChange.bind(null, delayElement));
	matchElement.addEventListener('change', processChange.bind(null, matchElement));
	matchElement.addEventListener('blur', processChange.bind(null, matchElement));
	
	// Tooltip: Delay
	delayElement.title = "The action(s) are only run after the trigger has been satisfied this many times\n";

	// Tooltip: Limit/Match
	matchElement.title = "The action(s) are only run until the trigger has been satisfied this many times\n";

	triggerCounter++;
	processChange("none");
}

function removeTrigger(triggerIndex) {
	var trigger = document.getElementById("trigger_" + triggerIndex);
	trigger.parentNode.removeChild(trigger);
	processChange("none");
}

// Return the currently selected element within a given "select" element
function getSelectedElement(selectElement) {
	return selectElement.options[selectElement.selectedIndex];
}

// Select an option in a <select> element by its value
function selectOptionByValue(selectElement, valueToSelect) {
	var optionElements = selectElement.getElementsByTagName("option");
	for (var i = 0; i < optionElements.length; i++) {
		if (optionElements[i].value == valueToSelect) {
			optionElements[i].selected = true;
			return true;
		}
	}
	// If we reach here, the specified value was not found in the <select>
	return false;
}

// Enable's a specific element's HTML label
function enableLabel(elementId) {
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if (labels[i].htmlFor == elementId) {
			labels[i].setAttribute("data-disabled", "false");
		}
	}
}

// Disables a specific element's HTML label
function disableLabel(elementId) {
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if (labels[i].htmlFor == elementId) {
			labels[i].setAttribute("data-disabled", "true");
		}
	}
}

// Enables a specific option in a <select> element
function enableOption(selectElement, optionToEnable) {
	var optionElements = selectElement.getElementsByTagName("option");
	for (var i = 0; i < optionElements.length; i++) {
		if (optionElements[i].value == optionToEnable) {
			optionElements[i].disabled = false;
			optionElements[i].style.display = null; // i.e. default
		}
	}
}

// Enables all options in a <select> element
function enableAllOptions(selectElement) {
	var optionElements = selectElement.getElementsByTagName("option");
	for (var i = 0; i < optionElements.length; i++) {
		optionElements[i].disabled = false;
		optionElements[i].style.display = null; // i.e. default
	}
}

// Disables all options in a <select> element
function disableAllOptions(selectElement) {
	var optionElements = selectElement.getElementsByTagName("option");
	for (var i = 0; i < optionElements.length; i++) {
		optionElements[i].disabled = true;
		optionElements[i].style.display = "none";
	}
}

// Returns true if all options in a <select> element are disabled, false otherwise
function areAllOptionsDisabled(selectElement) {
	var optionElements = selectElement.getElementsByTagName("option");
	for (var i = 0; i < optionElements.length; i++) {
		if (!optionElements[i].disabled) {
			return false;
		}
	}
	return true;
}

// Returns true if any triggers are using the "sleep" action
function isThreadSleepActionSelected() {
	var selectElements = document.getElementsByTagName("select");
	for (var i = 0; i < selectElements.length; i++) {
		if (getSelectedElement(selectElements[i]).value == "sleep") {
			return true;
		}
	}
	return false;
}

// Returns true if any triggers are using the "jstacktrace" action
function isMethodJStackTraceActionSelected() {
	var selectElements = document.getElementsByTagName("select");
	for (var i = 0; i < selectElements.length; i++) {
		if (selectElements[i].id.indexOf("trig_meth_ent_") != -1
			|| selectElements[i].id.indexOf("trig_meth_ex_") != -1)
		{
			if (getSelectedElement(selectElements[i]).value == "jstacktrace") {
				return true;
			}
		}
	}
	return false;
}

// Returns true if any triggers are using the "jstacktrace" action
function isTracepointJStackTraceActionSelected() {
	var selectElements = document.getElementsByTagName("select");
	for (var i = 0; i < selectElements.length; i++) {
		if (selectElements[i].id.indexOf("trig_tp_act_") != -1) {
			if (getSelectedElement(selectElements[i]).value == "jstacktrace") {
				return true;
			}
		}
	}
	return false;
}

// Returns true if any triggers use the specified action, false otherwise
function isTriggerActionSelected(actionName) {
	for (var i = 0; i < triggerCounter; i++) {
		var actionElements = [
			document.getElementById("trig_meth_ent_" + i),
			document.getElementById("trig_meth_ex_" + i),
			document.getElementById("trig_tp_act_" + i),
			document.getElementById("trig_grp_act_" + i)
		];
		for (var j = 0; j < actionElements.length; j++) {
			if (actionElements[j] != null) {
				if (getSelectedElement(actionElements[j]).value == actionName) {
					return true;
				}
			}
		}
	}

	// If we reach here we didn't find any resume actions
	return false;
}

// Returns true if an output file is specified
function isOutputFileSpecified() {
	var regularOutputElement = document.getElementById("file_text");
	if (!regularOutputElement.disabled && regularOutputElement.value != "") {
		return true;
	} else {
		return false;
	}
}

// Returns true if an Exception output file is specified
function isExceptionOutputFileSpecified() {
	var exceptionOutputElement = document.getElementById("file_text_exception");
	if (!exceptionOutputElement.disabled && exceptionOutputElement.value != "") {
		return true;
	} else {
		return false;
	}
}

// Returns true if at least one tracepoint is enabled, false otherwise
function isAtLeastOneTracepointEnabled() {
	var disableDefaultTracepointsElement = document.getElementById("disable_predefined");
	if (disableDefaultTracepointsElement.disabled || !disableDefaultTracepointsElement.checked) {
		return true;
	} else {
		for (var i = 0; i < tracepointCounter; i++) {
			if (document.getElementById("tracepoint_" + i) != null) {
				return true;
			}
		}
	}
	return false;
}

// Returns true if a "methods" component tracepoint is enabled
function isMethodTracepointEnabled() {
	for (var i = 0; i < tracepointCounter; i++) {
		var methodsComponentOption = document.getElementById("tp_comp_mt_" + i);
		if (methodsComponentOption != null && methodsComponentOption.selected) {
			return true;
		}
	}
	return false;
}

// Returns true if a "methods" component tracepoint is enabled, with trace checkbox enabled
function isMethodTracepointEnabledForTracing() {
	for (var i = 0; i < tracepointCounter; i++) {
		var methodsComponentOption = document.getElementById("tp_comp_mt_" + i);
		var traceCheckbox = document.getElementById("tp_trace_" + i);
		if (methodsComponentOption != null && methodsComponentOption.selected
			&& traceCheckbox != null && traceCheckbox.checked		
		) {
			return true;
		}
	}
	return false;
}

// Returns true if an "all" component tracepoint is enabled
function isAllTracepointEnabled() {
	for (var i = 0; i < tracepointCounter; i++) {
		var allComponentsOption = document.getElementById("tp_comp_all_" + i);
		if (allComponentsOption != null && allComponentsOption.selected) {
			return true;
		}
	}
	return false;
}

// Returns true if an "all" component tracepoint is enabled, with trace checkbox enabled
function isAllTracepointEnabledForTracing() {
	for (var i = 0; i < tracepointCounter; i++) {
		var allComponentsOption = document.getElementById("tp_comp_all_" + i);
		var traceCheckbox = document.getElementById("tp_trace_" + i);
		if (allComponentsOption != null && allComponentsOption.selected
			&& traceCheckbox != null && traceCheckbox.checked
		) {
			return true;
		}
	}
	return false;
}

// Returns true if a tracepoint including the specified tracepoint ID is enabled, with trace checkbox enabled, false otherwise
function isIdTracepointEnabledForTracing(specifiedId) {
	for (var i = 0; i < tracepointCounter; i++) {
		var tracepointIdElement = document.getElementById("tp_id_" + i);
		if (tracepointIdElement != null) {
			// If tracing is not enabled skip to the next tracepoint
			var traceCheckbox = document.getElementById("tp_trace_" + i);
			if (traceCheckbox == null || !traceCheckbox.checked) {
				continue;
			}
			
			// Simple case
			if (tracepointIdElement.value.indexOf(specifiedId) != -1) {
				return true;
			}

			// Deal with ranges
			var ids = tracepointIdElement.value.split(",");
			for (var j = 0; j < ids.length; j++) {
				if (ids[j].indexOf("-") != -1) {
					var regexArray = ids[j].match(/([a-zA-Z0-9]+)\.(\d+)-(\d+)/);
					var component = regexArray[1];
					var rangeStart = regexArray[2];
					var rangeEnd = regexArray[3];
					if (specifiedId.indexOf("-") == -1) {
						// Specified ID is not a range
						regexArray = specifiedId.match(/([a-zA-Z0-9]+)\.(\d+)$/);
						var specifiedComponent = regexArray[1]
						var specifiedIndex = parseInt(regexArray[2]);
						if (specifiedComponent == component
							&& specifiedIndex >= rangeStart
							&& specifiedIndex <= rangeEnd)
						{
							return true;
						}
					} else {
						// Specified ID is a range
						regexArray = specifiedId.match(/([a-zA-Z0-9]+)\.(\d+)-(\d+)/);
						var specifiedComponent = regexArray[1]
						var specifiedRangeStart = parseInt(regexArray[2]);
						var specifiedRangeEnd = parseInt(regexArray[3]);
						if (specifiedComponent == component
							&& specifiedRangeStart >= rangeStart
							&& specifiedRangeStart <= rangeEnd
							&& specifiedRangeEnd >= rangeStart
							&& specifiedRangeEnd <= rangeEnd)
						{
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}

// Returns true if the "maximal" or "exception" tracepoint destinations are enabled
function isMaximalOrExceptionDestinationEnabled() {
	for (var i = 0; i < tracepointCounter; i++) {
		var maxDestElement = document.getElementById("tp_dest_maximal_" + i);
		var excDestElement = document.getElementById("tp_dest_exception_" + i);		
		if (maxDestElement != null && maxDestElement.selected) {
			return true;
		}	
		if (excDestElement != null && excDestElement.selected) {
			return true;
		}		
	}
	return false;
}

// Returns true if a method trace spec has been added, false otherwise
function isMethodOptionEnabled() {
	for (var i = 0; i < methodCounter; i++) {
			if (document.getElementById("method_" + i) != null) {
			return true;
		}
	}
	return false;
}

// Make a best effort to fix the case for tracepoint IDs
function fixTracepointIdCase(id) {
	var knownComponents = [
		// Upper case
		"AWT",
		"FONTMANAGER",
		"IO",
		"JAVA",
		"JSOR",
		"JVERBS",
		"MAWT",
		"NET",
		"NIO",
		"WRAPPERS",

		// Lower case
		"avl",
		"cuda4j",
		"ddrext",
		"dg",
		"gptest",
		"hashtable",
		"ifa",
		"j9",
		"j9bcu",
		"j9bcverify",
		"j9codertvm",
		"j9dfix",
		"j9dmp",
		"j9hook",
		"j9hshelp",
		"j9jcl",
		"j9jit",
		"j9jni",
		"j9jvmti",
		"j9mm",
		"j9prt",
		"j9scar",
		"j9shr",
		"j9trc",
		"j9trc_aux",
		"j9thr",
		"j9util",
		"j9utilcore",
		"j9vgc",
		"j9vm",
		"j9vmchk",
		"j9vmutil",
		"j9vrb",
		"map",
		"module",
		"mt",
		"omrport",
		"omrrmm",
		"omrti",
		"omrvm",
		"pool",
		"simplepool",
		"srphashtable",
		"sunvmi",

		// Mixed case
		"Audio"
	];

	// If the ID looks valid and the specified component matches an component in the table
	// (case insensitive match), return the correct form
	if (id.match(/^([a-zA-Z0-9])+\.\d+(-\d+)?$/) != null) {
		var idArray = id.split(".");
		var component = idArray[0];
		var tracepointNumber = idArray[1];
		for (var i = 0; i < knownComponents.length; i++) {
			if (component.toLowerCase() == knownComponents[i].toLowerCase()) {
				return knownComponents[i] + "." + tracepointNumber;
			}
		}
	}

	// If we reach here the tracepoint ID is either invalid or contains an unknown component,
	// so just return it without making any changes
	return id;
}

function disableInput(inputElement) {
	// Disable the input itself
	inputElement.disabled = true;

	// Disable associated labels, if any
	var labelElements = getLabelsForInput(inputElement);
	if (typeof labelElements != undefined && labelElements != null) {
		for (var i = 0; i < labelElements.length; i++) {
			labelElements[i].setAttribute("data-disabled", "true");
		}
	}

	// Disable associated buttons, if any
	var buttonElements = getButtonsForInput(inputElement);
	if (typeof buttonElements != undefined && buttonElements != null) {
		for (var i = 0; i < buttonElements.length; i++) {
			buttonElements[i].disabled = true;
		}
	}
}

function enableInput(inputElement) {
	// Enable the input itself
	inputElement.disabled = false;

	// Enable associated labels, if any
	var labelElements = getLabelsForInput(inputElement);
	if (typeof labelElements != undefined && labelElements != null) {
		for (var i = 0; i < labelElements.length; i++) {
			labelElements[i].setAttribute("data-disabled", "false");
		}
	}

	// Enable associated buttons, if any
	var buttonElements = getButtonsForInput(inputElement);
	if (typeof buttonElements != undefined && buttonElements != null) {
		for (var i = 0; i < buttonElements.length; i++) {
			buttonElements[i].disabled = false;
		}
	}
}

function getLabelsForInput(inputElement) {
	var allLabels = document.getElementsByTagName("label");
	var results = [];
	for (var i = 0; i < allLabels.length; i++) {
		if (inputElement.id == allLabels[i].htmlFor) {
			results.push(allLabels[i]);
		}
	}
	return results;
}

function getButtonsForInput(inputElement) {
	var allInputs = document.getElementsByTagName("input");
	var results = [];
	for (var i = 0; i < allInputs.length; i++) {
		if (allInputs[i].type == "button"
			&& allInputs[i].getAttribute("data-target") == inputElement.id)
		{
			results.push(allInputs[i]);
		}
	}
	return results;
}

// If a string ends with a ',' remove it
function removeFinalCommaIfPresent(string) {
	if (string.length > 0 && string.lastIndexOf(",") == string.length - 1) {
		return string.slice(0, -1);
	} else {
		return string;
	}
}

// If a string ends with a '&' remove it
function removeFinalAmpersandIfPresent(string) {
	if (string.length > 0 && string.lastIndexOf("&") == string.length - 1) {
		return string.slice(0, -1);
	} else {
		return string;
	}
}

// Checks a string for invalid tracepoint specifications
// If invalid specs are found, an HTML formatted string describing them is returned.
// Otherwise an empty string is returned.
function findInvalidTracepointSpecs(value) {
	// Spec may contain multiple elements separated by commas
	var specs = value.split(",");
	var invalidSpecs = "";
	for (var i = 0; i < specs.length; i++) {
		if (specs[i] == "") {
			invalidSpecs += "ERROR: Empty tracepoint specification<br>";
		} else {
			if (specs[i].match(/^([a-zA-Z0-9])+\.\d+(-\d+)?$/) == null) {
				invalidSpecs += "ERROR: Invalid tracepoint specification: \"" + specs[i] + "\"<br>";
			}
		}
	}
	return invalidSpecs;
}

// Check validity of a method specification string. Rules:
//    1. Class name can start and/or end with a wildcard character
//    2. Method name can start and/or end with a wildcard character
//    3. Can contain just a single wildcard character on its own
//    4. Cannot contain a wildcard in any other location
//    5. Cannot contain a comma
// If the spec is invalid, an HTML formatted string describing it is returned.
// Otherwise an empty string is returned.
function findInvalidMethodSpec(methodSpecElement) {
	var invalidSpec = "";	
	if (methodSpecElement != null) {
		var methodSpecValue = methodSpecElement.value;
		if (methodSpecValue == "") {
			invalidSpec += "ERROR: Missing method specification<br>";
		} else {
			if (methodSpecValue.indexOf(",") != -1) {
				invalidSpec += "ERROR: Invalid method specification: must not contain a comma: \"" + escapeHTML(methodSpecElement.value) + "\"<br>";
			}
			
			var methodSpecParts = methodSpecValue.split(".");
			if (methodSpecParts.length != 2) {
				if (hasInvalidWildcard(methodSpecValue)) {
					invalidSpec += "ERROR: Invalid method specification: wildcards can only be used at the beginning and/or end of the class/method name: \"" + escapeHTML(methodSpecElement.value) + "\"<br>";
				}
			} else {
				var methodSpecClass = methodSpecParts[0];
				if (hasInvalidWildcard(methodSpecClass)) {
					invalidSpec += "ERROR: Invalid method specification: wildcards can only be used at the beginning and/or end of the class name: \"" + escapeHTML(methodSpecClass) + "\"<br>";
				}
				
				var methodSpecMethod = methodSpecParts[1];
				if (hasInvalidWildcard(methodSpecMethod)) {
					invalidSpec += "ERROR: Invalid method specification: wildcards can only be used at the beginning and/or end of the method name: \"" + escapeHTML(methodSpecMethod) + "\"<br>";
				}
			}
		}
	}
	return invalidSpec;
}

// Check for invalid wildcards in method specification class/method names.
// Wildcards are allowed at the beginning and/or end of the string
function hasInvalidWildcard(classOrMethod) {
	if ((classOrMethod.lastIndexOf("*") > 0) && (classOrMethod.indexOf("*", 1) != classOrMethod.length - 1)) {
		return true;
	}
	return false;
}

function buildAndUpdateResult() {
	var resultString = "-Xtrace:";

	// Disable predefined (default) tracepoints?
	var disableDefaultTracepointsElement = document.getElementById("disable_predefined");
	if (!disableDefaultTracepointsElement.disabled && disableDefaultTracepointsElement.checked) {
		resultString += "none,";
	}

	// Add tracepoints
	var tracepointString = getTracepointResultString()
	if (tracepointString != "") {
		resultString += tracepointString + ",";
	}

	// Add methods
	var methodString = getMethodResultString();
	if (methodString != "") {
		resultString += methodString + ",";
	}

	// Add triggers
	var triggerString = getTriggerResultString();
	if (triggerString != "") {
		resultString += triggerString + ",";
	}

	// Add output and/or exception.output
	var outputString = getOutputResultString();
	if (outputString != "") {
		resultString += outputString;
	}

	// If the string ends with a ',' remove it
	resultString = removeFinalCommaIfPresent(resultString);

	// Wrap in quotes if option checked
	// TODO: This doesn't work properly on Linux if there is an '!' in a method/tpnid field
	//       Single quotes don't work on Windows...
	if (document.getElementById("wrap_in_quotes").checked) {
		// Escape backslashes
		resultString = resultString.replace(/\\/g, "\\\\");
		
		// Escape quotes
		resultString = resultString.replace(/"/g, "\\\"");
		
		// Wrap the entire result string in quotes
		resultString = "\"" + resultString + "\"";
	}

	// Escape HTML
	resultString = escapeHTML(resultString);

	// Add <wbr> tags after '+', ','. '/' and '=' characters
	// to make the wrapping prettier for longer options
	resultString = resultString.replace(/,/g, ",<wbr>");
	resultString = resultString.replace(/\+/g, "+<wbr>");
	resultString = resultString.replace(/\//g, "/<wbr>");
	resultString = resultString.replace(/=/g, "=<wbr>");

	// Initialize variables for error checking
	var resultIsGreen = true;
	var errorsHtml = "";
	var warningsHtml = "";

	// Check whether any tracepoints/methods/triggers are present
	var inputPresent = false;
	var maxCounter = Math.max(tracepointCounter, Math.max(methodCounter, triggerCounter));
	for (var i = 0; i < maxCounter; i++) {
		if (document.getElementById("tracepoint_" + i) != null
			|| document.getElementById("method_" + i) != null
			|| document.getElementById("trigger_" + i) != null)
		{
			inputPresent = true;
			break;
		}
	}
	if (!inputPresent) {
		resultIsGreen = false;
		errorsHtml += "ERROR: No tracepoints/methods/triggers have been specified<br>";
	}

	// Check validity of tracepoint IDs
	for (var i = 0; i < tracepointCounter; i++) {
		var tracepointIdElement = document.getElementById("tp_id_" + i);
		if (tracepointIdElement != null) {
			var invalidSpecs = findInvalidTracepointSpecs(tracepointIdElement.value);
			if (invalidSpecs != "") {
				resultIsGreen = false;
				setErrorStyle(tracepointIdElement);
				errorsHtml += invalidSpecs;
			} else {
				unsetErrorStyle(tracepointIdElement);
			}
		}
	}

	// Check that all tracepoints have either trace or count enabled
	for (var i = 0; i < tracepointCounter; i++) {
		var traceCheckboxElement = document.getElementById("tp_trace_" + i);
		var countCheckboxElement = document.getElementById("tp_count_" + i);
		if (traceCheckboxElement != null && countCheckboxElement != null) {
			if (!traceCheckboxElement.checked && !countCheckboxElement.checked) {
				resultIsGreen = false;
				setErrorStyle(traceCheckboxElement);
				setErrorStyle(countCheckboxElement);
				errorsHtml += "ERROR: Trace and/or Count must be enabled for each tracepoint<br>";
			} else {
				unsetErrorStyle(traceCheckboxElement);
				unsetErrorStyle(countCheckboxElement);
			}
		}
	}

	// Check that the mt tracepoint is enabled if a method has been specified
	if (   isMethodOptionEnabled()
		&& !isMethodTracepointEnabled()
		&& !isAllTracepointEnabled() )
	{
		resultIsGreen = false;
		errorsHtml += "ERROR: A method has been specified but the \"Methods\" tracepoint has not been enabled. Methods will not be traced or counted.<br>";
	}

	// Check that the mt tracepoint is enabled if a jstacktrace method trigger action is enabled
	if (   isMethodJStackTraceActionSelected()
		&& !isMethodTracepointEnabledForTracing()
		&& !isAllTracepointEnabledForTracing() )
	{
		resultIsGreen = false;
		errorsHtml += "ERROR: A jstacktrace method trigger action has been enabled but the \"Methods\" tracepoint has not been enabled for tracing. Stacks will not be traced.<br>";
	}

	// Check that a method trace or jstacktrace method trigger action is defined if an mt tracepoint is enabled
	if (   isMethodTracepointEnabled()
		&& !isMethodOptionEnabled()
		&& !isMethodJStackTraceActionSelected() )
	{
		resultIsGreen = false;
		errorsHtml += "ERROR: \"Methods\" component tracepoint is enabled but no methods have been specified, and no jstacktrace method trigger actions have been enabled<br>";
	}

	// Method option checks
	var argTracingEnabled = false;
	var methodSpecForJitExclude = "";
	for (var i = 0; i < methodCounter; i++) {
		var methodSpecElement = document.getElementById("meth_text_" + i);

		if (methodSpecElement != null) {
			// Check validity of method specification
			var invalidSpec = findInvalidMethodSpec(methodSpecElement);
			if (invalidSpec != "") {
				resultIsGreen = false;
				setErrorStyle(methodSpecElement);
				errorsHtml += invalidSpec;
			} else {
				unsetErrorStyle(methodSpecElement);
			}
			
			// Check whether argument and return value tracing is enabled.
			// The warning includes an example JIT exclude option.
			var argTracingCheckbox = document.getElementById("meth_args_" + i);
			if (!argTracingCheckbox.disabled && argTracingCheckbox.checked) {
				argTracingEnabled = true;
				var methodSpecValue = methodSpecElement.value;

				// Method specs for JIT excludes must specify parameters or match them with a wildcard,
				// so we append a '*' if the method spec doesn't already end in one
				if (methodSpecValue.length > 0) {
					if (methodSpecValue.lastIndexOf("*") != methodSpecValue.length - 1) {
						methodSpecValue += "*";
					}

					if (methodSpecForJitExclude == "") {
						methodSpecForJitExclude += methodSpecValue;
					} else {
						methodSpecForJitExclude += "|" + methodSpecValue;
					}
				}
			}
		}
	}
	if (argTracingEnabled) {
		if (methodSpecForJitExclude != "") {
			methodSpecForJitExclude = escapeHTML(methodSpecForJitExclude);
			var jitExcludeOption = "-Xjit:exclude={" + methodSpecForJitExclude + "},dontinline={" + methodSpecForJitExclude + "}";
			warningsHtml += "WARNING: Arguments and return values will only be traced for interpreted methods. Use this JIT exclude option if necessary: <span style=\"white-space: nowrap\">\"" + jitExcludeOption + "\"</span><br>";
		} else {
			warningsHtml += "WARNING: Arguments and return values will only be traced for interpreted methods. Use a JIT exclude option if necessary.<br>";
		}
	}

	// Trigger checks
	for (var i = 0; i < triggerCounter; i++) {
		// Method trigger checks
		var methodSpecElement = document.getElementById("trig_meth_spec_" + i);
		if (methodSpecElement != null) {
			// Check validity of method specification
			var invalidSpec = findInvalidMethodSpec(methodSpecElement);
			if (invalidSpec != "") {
				resultIsGreen = false;
				setErrorStyle(methodSpecElement);
				errorsHtml += invalidSpec;
			} else {
				unsetErrorStyle(methodSpecElement);
			}
			
			// Check that an entry or exit action is provided
			var entryActionElement = getSelectedElement(document.getElementById("trig_meth_ent_" + i));
			var exitActionElement = getSelectedElement(document.getElementById("trig_meth_ex_" + i));
			if (entryActionElement.value == "none" && exitActionElement.value == "none") {
				resultIsGreen = false;
				setErrorStyle(entryActionElement);
				setErrorStyle(exitActionElement);
				errorsHtml += "ERROR: No entry/exit action selected for method trigger: " + escapeHTML(methodSpecElement.value) + "<br>";
			} else {
				unsetErrorStyle(entryActionElement);
				unsetErrorStyle(exitActionElement);
			}
		}

		// Tracepoint trigger checks
		var tracepointIdElement = document.getElementById("trig_tp_tpnid_" + i);
		if (tracepointIdElement != null) {
			var tracepointActionElement = getSelectedElement(document.getElementById("trig_tp_act_" + i));
			if (tracepointIdElement.value == "") {
				resultIsGreen = false;
				setErrorStyle(tracepointIdElement);
				errorsHtml += "ERROR: Missing tracepoint ID in trigger<br>";
			} else if (tracepointIdElement.value.indexOf(",") != -1) {
				resultIsGreen = false;
				setErrorStyle(tracepointIdElement);
				errorsHtml += "ERROR: Trigger tracepoint ID field contains multiple IDs. Only one tracepoint ID or range of tracepoint IDs is allowed per trigger.<br>";
			} else if (findInvalidTracepointSpecs(tracepointIdElement.value) != "") {
				resultIsGreen = false;
				setErrorStyle(tracepointIdElement);
				errorsHtml += findInvalidTracepointSpecs(tracepointIdElement.value);
			} else if (tracepointActionElement.value == "jstacktrace" && !isIdTracepointEnabledForTracing(tracepointIdElement.value)) {
				resultIsGreen = false;
				setErrorStyle(tracepointIdElement);
				errorsHtml += "ERROR: A jstacktrace tracepoint trigger action has been enabled but the specified tracepoint ID is not being traced. Stacks will not be traced.<br>";
			} else {
				unsetErrorStyle(tracepointIdElement);
			}

			if (tracepointActionElement.value == "none") {
				resultIsGreen = false;
				setErrorStyle(tracepointActionElement);
				errorsHtml += "ERROR: No action selected for tracepoint trigger: " + tracepointIdElement.value + "<br>";
			} else {
				unsetErrorStyle(tracepointActionElement);
			}
		}

		// Check validity of delay value
		var delayElement = document.getElementById("trig_delay_" + i);
		if (delayElement != null) {
			if (delayElement.value < 0) {
				resultIsGreen = false;
				setErrorStyle(delayElement);
				errorsHtml += "ERROR: Invalid trigger delay (" + delayElement.value + "): must be >= 0.<br>";
			} else {
				unsetErrorStyle(delayElement);
			}
		}

		// Check validity of limit/match value
		var matchElement = document.getElementById("trig_match_" + i);
		if (matchElement != null) {
			if (matchElement.value < 0) {
				resultIsGreen = false;
				setErrorStyle(matchElement);
				errorsHtml += "ERROR: Invalid trigger limit (" + matchElement.value + "): must be >= 0.<br>";
			} else {
				unsetErrorStyle(matchElement);
			}
		}
	}

	// If any triggers have an action to start tracing, check:
	//    1. Whether trace is initially disabled
	//    2. Whether any tracepoints are enabled
	if (isTriggerActionSelected("resume") || isTriggerActionSelected("resumethis")) {
		if (isAtLeastOneTracepointEnabled()) {
			if (isTriggerActionSelected("resumethis")) {
				if (!document.getElementById("trace_initially_disabled").checked && !isTriggerActionSelected("suspendthis")) {
					errorsHtml += "WARNING: Trigger action \"Start tracing (current thread)\" is enabled, but tracing for the current thread is never disabled. Did you mean to check the \"Trace initially stopped\" option or add a \"Stop trace (current thread)\" trigger action?<br>";
				}				
			}
			if (isTriggerActionSelected("resume")) {
				if (!document.getElementById("trace_initially_disabled").checked && !isTriggerActionSelected("suspend")) {
					errorsHtml += "WARNING: Trigger action \"Start tracing (all threads)\" is enabled, but tracing for all threads is never disabled. Did you mean to check the \"Trace initially stopped\" option or add a \"Stop trace (all threads)\" trigger action?<br>";
				}
			}
		} else {
			resultIsGreen = false;
			errorsHtml += "ERROR: A trigger action is set to start tracing, but no tracepoints are enabled<br>";
		}
	}

	// If trace is initially stopped using "suspend" it cannot be enabled on a per thread basis
	// using "resumethis", and if trace is initially stopped using "resumecount=1" it cannot be
	// enabled globally using "resume", so we cannot use these two actions together in any sane way
	// (although Xtrace itself will not complain).
	if (isTriggerActionSelected("resume") && isTriggerActionSelected("resumethis") && document.getElementById("trace_initially_disabled").checked) {
		errorsHtml += "WARNING: Trigger actions \"Start trace (current thread)\" and \"Start trace (all threads)\" are both enabled, and trace is initially stopped. The former action will have no effect until the latter action has been triggered.<br>";		
	}

	// If no triggers have an action to start tracing, check that "Trace initially stopped" is not selected
	if (!isTriggerActionSelected("resume") && !isTriggerActionSelected("resumethis")) {
		if (isAtLeastOneTracepointEnabled()) {
			if (document.getElementById("trace_initially_disabled").checked) {
				errorsHtml += "WARNING: \"Trace initially stopped\" is selected, but no trigger actions enable tracing. No trace will be produced.<br>";
			}
		}
	}

	// Check output file fields
	var fileTextElement = document.getElementById("file_text");
	if (!fileTextElement.disabled) {
		if (!isOutputFileSpecified()) {
			// Warning only - output file is not manadatory
			warningsHtml += "WARNING: No output file specified for trace buffers (trace will still be visible in snap dumps)<br>";
		} else if (containsReservedChars(fileTextElement.value)) {
			warningsHtml += "WARNING: Trace buffer output file name contains a character that is disallowed on some platforms<br>";
		}

		// We have to do this separately (instead of in an else if) to ensure that the
		// error style always gets unset after removing the comma
		if (fileTextElement.value.indexOf(",") != -1) {
			resultIsGreen = false;
			setErrorStyle(fileTextElement);
			errorsHtml += "ERROR: Invalid trace buffer output file name: must not contain a comma.<br>";
		} else {
			unsetErrorStyle(fileTextElement);
		}	
	}
	var exceptionFileTextElement = document.getElementById("file_text_exception");
	if (!exceptionFileTextElement.disabled) {
		if (!isExceptionOutputFileSpecified()) {
			// Exception output *is* mandatory if enabled
			resultIsGreen = false;
			setErrorStyle(exceptionFileTextElement);
			errorsHtml += "ERROR: No output file specified for Exception trace buffers<br>";
		} else if (exceptionFileTextElement.value.indexOf(",") != -1) {
			resultIsGreen = false;
			setErrorStyle(fileTextElement);
			errorsHtml += "ERROR: Invalid Exception trace buffer output file name: must not contain a comma.<br>";
		} else {
			unsetErrorStyle(exceptionFileTextElement);
		}

		if (containsReservedChars(exceptionFileTextElement.value)) {
			warningsHtml += "WARNING: Exception trace buffer output file name contains a character that is disallowed on some platforms<br>";
		}
	} else {
		unsetErrorStyle(exceptionFileTextElement);
	}

	// Output file checks when generations > 1
	var generationsElement = document.getElementById("output_generations");
	var fileElement = document.getElementById("file_text");
	var fileString = fileElement.value;
	if (fileString != ""
		&& !generationsElement.disabled
		&& generationsElement.value > 1)
	{
		// Check that '#' token is present in output file text when generations > 1
		if (fileString.indexOf("#") == -1) {
			resultIsGreen = false;
			setErrorStyle(fileElement);
			errorsHtml += "ERROR: Maximum number of output files is > 1, but the File Counter token ('#') is missing from the output file name<br>";
		} else {
			unsetErrorStyle(fileElement);
		}
		// Check that only one '#' token is present
		if (fileString.indexOf("#") != fileString.lastIndexOf("#")) {
			warningsHtml += "WARNING: There are two '#' tokens in the output file field. Only the first token will be replaced by the file counter.<br>";
		}
		// Check that the max file size is > 0
		var outputSizeElement = document.getElementById("output_size");
		if (outputSizeElement.value == 0) {
			warningsHtml += "WARNING: Maximum number of output files is > 1, but the maximum file size is set to 0<br>";
		} else {
			unsetErrorStyle(outputSizeElement);
		}
	}

	// Check remaining number field values (trigger number fields have already been checked)
	if (generationsElement.value < 1 || generationsElement.value > 36) {
		resultIsGreen = false;
		setErrorStyle(generationsElement);
		errorsHtml += "ERROR: Invalid maximum number of output files (" + generationsElement.value + "): valid range is 1-36.<br>";
	} else {
		unsetErrorStyle(generationsElement);
	}
	var outputSizeElement = document.getElementById("output_size");
	if (outputSizeElement.value < 0) {
		resultIsGreen = false;
		setErrorStyle(outputSizeElement);
		errorsHtml += "ERROR: Invalid maximum output file size (" + outputSizeElement.value + "): must be > 0, or 0 to set no limit.<br>";
	} else {
		unsetErrorStyle(outputSizeElement);
	}
	var outputSizeExceptionElement = document.getElementById("output_size_exception");
	if (!outputSizeExceptionElement.disabled && outputSizeExceptionElement.value < 0) {
		resultIsGreen = false;
		setErrorStyle(outputSizeExceptionElement);
		errorsHtml += "ERROR: Invalid maximum Exception output file size (" + outputSizeExceptionElement.value + ") is invalid: must be > 0, or 0 to set no limit.<br>";
	} else {
		unsetErrorStyle(outputSizeExceptionElement);
	}
	var sleepTimeElement = document.getElementById("sleep_time");
	if (!sleepTimeElement.disabled && sleepTimeElement.value <= 0) {
		resultIsGreen = false;
		setErrorStyle(sleepTimeElement);
		errorsHtml += "ERROR: Invalid sleep time (" + sleepTimeElement.value + "): must be > 0.<br>";
	} else {
		unsetErrorStyle(sleepTimeElement);
	}
	var bufferSizeElement = document.getElementById("buffer_size");
	if (bufferSizeElement.value <= 0) {
		resultIsGreen = false;
		setErrorStyle(bufferSizeElement);
		errorsHtml += "ERROR: Invalid trace buffer size (" + bufferSizeElement.value + "): must be > 0.<br>";
	} else {
		unsetErrorStyle(bufferSizeElement);
	}
	var stackDepthElement = document.getElementById("stack_depth");
	if (stackDepthElement.value < 0) {
		resultIsGreen = false;
		setErrorStyle(stackDepthElement);
		errorsHtml += "ERROR: Invalid stack depth (" + stackDepthElement.value + "): must be > 0, or 0 to set no limit.<br>";
	} else {
		unsetErrorStyle(stackDepthElement);
	}

	// Add the result string in the appropriate colour
	if (resultIsGreen) {
		document.getElementById("result").innerHTML = "<font color=\"green\">" + resultString + "</font>";
	} else {
		document.getElementById("result").innerHTML = "<font color=\"red\">" + resultString + "</font>";
	}

	// Add errors/warnings, if any
	if (errorsHtml != "" || warningsHtml != "") {
		document.getElementById("errors").innerHTML = errorsHtml + warningsHtml;
	} else {
		document.getElementById("errors").innerHTML = "&nbsp;";
	}
}

function getTracepointResultString() {
	// Cycle through tracepoints <li> elements, format the contents
	// and add them to a comma-separated string
	var destinationStrings = {};
	var destinationCount = {};
	var countString = "";
	for (var i = 0; i < tracepointCounter; i++) {
		var tracepointListElement = document.getElementById("tracepoint_" + i);

		if (tracepointListElement != null) {
			var destination = getSelectedElement(document.getElementById("tp_dest_select_" + i)).value;

			if (typeof destinationStrings != undefined && destination in destinationStrings) {
				destinationCount[destination]++;
			} else {
				destinationCount[destination] = 1;
				destinationStrings[destination] = "";
			}

			switch (tracepointListElement.getAttribute("data-type")) {
				case "id":
					// [!]<tracepoint_id>[,<tracepoint_id>]
					var tracepointId = document.getElementById("tp_id_" + i).value;

					if (document.getElementById("tp_trace_" + i).checked) {
						destinationStrings[destination] += tracepointId + ",";
					}

					if (document.getElementById("tp_count_" + i).checked) {
						countString += tracepointId + ",";
					}

					break;

				case "component":
					// [!]<component>[{<group>}] or [!]<component>[{<type>}]
					var component = getSelectedElement(document.getElementById("tp_comp_select_" + i)).value;
					var tracepointSpec = component;

					var level = getSelectedElement(document.getElementById("tp_level_select_" + i)).value;
					if (level != 9) {
						tracepointSpec += "{L" + level + "}";
					}

					if (document.getElementById("tp_type_" + i).checked) {
						var type = getSelectedElement(document.getElementById("tp_type_select_" + i)).value;
						if (type != "all") {
							tracepointSpec += "{" + type + "}";
						}
					}

					if (document.getElementById("tp_group_" + i).checked) {
						var group = getSelectedElement(document.getElementById("tp_group_select_" + i)).value;
						if (group != "all") {
							tracepointSpec += "{" + group + "}";
						}
					}

					if (document.getElementById("tp_trace_" + i).checked) {
						destinationStrings[destination] += tracepointSpec + ",";
					}

					if (document.getElementById("tp_count_" + i).checked) {
						countString += tracepointSpec + ",";
					}

					break;
			}
		}
	}

	// Combine the tracepoint strings for each destination
	// And add curly braces if necessary
	var tracepointString = "";
	for (var destination in destinationStrings) {
		if (destinationStrings[destination] != "") {
			tracepointString += destination + "=";
			destinationStrings[destination] = removeFinalCommaIfPresent(destinationStrings[destination]);
			if (destinationCount[destination] > 1 || destinationStrings[destination].indexOf(",") != -1) {
				tracepointString += "{" + destinationStrings[destination] + "},";
			} else {
				tracepointString += destinationStrings[destination] + ",";
			}
		}
	}

	// Add the count string, adding curly braces if necessary
	if (countString != "") {
		countString = removeFinalCommaIfPresent(countString);
		if (countString.indexOf(",") != -1) {
			countString = "{" + countString + "}";
		}
		tracepointString += "count=" + countString;
	}

	return removeFinalCommaIfPresent(tracepointString);
}

function getMethodResultString() {
	// Cycle through methods and add them to a comma-separate string
	var methodOptionPresent = false;
	var methodString = "";
	for (var i = 0; i < methodCounter; i++) {
		var methodListElement = document.getElementById("method_" + i);
		if (methodListElement != null) {
			methodOptionPresent = true;
			var methodTextValue = document.getElementById("meth_text_" + i).value;
			if (methodTextValue != "") {
				methodString += methodTextValue;
				if (document.getElementById("meth_args_" + i).checked) {
					methodString += "()";
				}
				methodString += ",";
			}
		}
	}

	methodString = removeFinalCommaIfPresent(methodString);

	// If there's more than one method we need to enclose the list in curly braces
	if (methodString.indexOf(",") != -1) {
		methodString = "{" + methodString + "}";
	}

	// Add "methods=" prefix
	if (methodOptionPresent) {
		methodString = "methods=" + methodString;
	}

	return methodString;
}

function getTriggerResultString() {
	var triggerString = "";
	var sleepActionSelected = false;
	var resumeActionSelected = false;
	var resumethisActionSelected = false;

	for (var i = 0; i < triggerCounter; i++) {
		var triggerListElement = document.getElementById("trigger_" + i);
		if (triggerListElement != null) {
			switch (triggerListElement.getAttribute("data-type")) {
				case "method":
					// trigger=method{<methodspec>[,<entryAction>[,<exitAction>[,<delayCount>[,<matchcount>]]]]}

					// Method
					triggerString += "trigger=method{";
					var methodSpecString = document.getElementById("trig_meth_spec_" + i).value;
					if (methodSpecString != "") {
						triggerString += methodSpecString;
					}
					triggerString += ",";

					// Entry action
					var entryActionString = getSelectedElement(document.getElementById("trig_meth_ent_" + i)).value;
					if (entryActionString != "none") {
						triggerString += entryActionString;
					}
					triggerString += ",";

					// Exit action
					var exitActionString = getSelectedElement(document.getElementById("trig_meth_ex_" + i)).value;
					if (exitActionString != "none") {
						triggerString += exitActionString;
					}
					triggerString += ",";

					// Thread sleep selected?
					if (entryActionString == "sleep" || exitActionString == "sleep") {
						sleepActionSelected = true;
					}
					
					// Resume trace on all threads (resume) action selected?
					if (entryActionString == "resume" || exitActionString == "resume") {
						resumeActionSelected = true;
					}
					
					// Resume current thread (resumethis) action selected?
					if (entryActionString == "resumethis" || exitActionString == "resumethis") {
						resumethisActionSelected = true;
					}

					break;

				case "tracepoint":
					// trigger=tpnid{<tpnid>|<tpnidRange>,<action>[,<delayCount>[,<matchcount>]]}

					// tpnid
					triggerString += "trigger=tpnid{";
					var tracepointTpnidString = document.getElementById("trig_tp_tpnid_" + i).value;
					if (tracepointTpnidString != "") {
						triggerString += tracepointTpnidString;
					}
					triggerString += ",";

					// Action
					var actionString = getSelectedElement(document.getElementById("trig_tp_act_" + i)).value;
					if (actionString != "none") {
						triggerString += actionString;
					}
					triggerString += ",";

					// Thread sleep selected?
					if (actionString == "sleep") {
						sleepActionSelected = true;
					}
					
					// Resume all threads (resume) action selected?
					if (actionString == "resume") {
						resumeActionSelected = true;
					}
					
					// Resume current thread (resumethis) action selected?
					if (actionString == "resumethis") {
						resumethisActionSelected = true;
					}

					break;

				case "group":
					// trigger=group{<groupname>,<action>[,<delayCount>[,<matchcount>]]}

					// Group name
					var groupNameString = getSelectedElement(document.getElementById("trig_grp_name_" + i)).value;
					triggerString += "trigger=group{";
					triggerString += groupNameString + ",";

					// Action
					var actionString = getSelectedElement(document.getElementById("trig_grp_act_" + i)).value;
					if (actionString != "none") {
						triggerString += actionString;
					}
					triggerString += ",";

					// Thread sleep selected?
					if (actionString == "sleep") {
						sleepActionSelected = true;
					}
					
					// Resume all threads (resume) action selected?
					if (actionString == "resume") {
						resumeActionSelected = true;
					}
					
					// Resume current thread (resumethis) action selected?
					if (actionString == "resumethis") {
						resumethisActionSelected = true;
					}

					break;
			}

			// Delay
			var delayCountValue = document.getElementById("trig_delay_" + i).value;
			if (delayCountValue != 0) {
				triggerString += delayCountValue;
			}
			triggerString += ",";

			// Match / limit
			var matchCountValue = document.getElementById("trig_match_" + i).value;
			if (matchCountValue != 0) {
				triggerString += matchCountValue;
			}
			triggerString += ",";

			// Remove all trailing commas (we might have a few, depending on which options were specified)
			while (triggerString.length > 0 && triggerString.lastIndexOf(",") == triggerString.length - 1) {
				triggerString = removeFinalCommaIfPresent(triggerString);
			}

			// Close the curly braces and add a comma
			triggerString += "},";
		}
	}

	// Trace initially stopped/disabled?
	// Prepend the option(s) to the string for readability
	if (document.getElementById("trace_initially_disabled").checked) {
		if (resumeActionSelected) {
			// resume must be paired with suspend
			triggerString = "suspend," + triggerString;
		}
		if (resumethisActionSelected) {
			// resumethis must be paired with resumecount=1
			triggerString = "resumecount=1," + triggerString;
		}
		if (!resumeActionSelected && !resumethisActionSelected) {
			// If no resume* actions are enabled, use "suspend" (we could use either)
			triggerString = "suspend," + triggerString;
		}
	}

	// Sleep time
	if (sleepActionSelected) {
		triggerString += "sleeptime=" + document.getElementById("sleep_time").value + ",";
	}

	// Stack depth
	var stackDepthElement = document.getElementById("stack_depth");
	if (!stackDepthElement.disabled && stackDepthElement.value > 0) {
		triggerString += "stackdepth=" + stackDepthElement.value;
	}

	return removeFinalCommaIfPresent(triggerString);
}

function getOutputResultString() {
	var outputString = "";

	var buffersString = "";

	// Buffer size
	var buffersSizeElement = document.getElementById("buffer_size");
	var bufferSize = buffersSizeElement.value;
	var bufferSizeUnits = document.getElementById("buffer_size_units").value;
	if (!buffersSizeElement.disabled
		&& (bufferSize != 8 || bufferSizeUnits != "k") )
	{
		buffersString += bufferSize + bufferSizeUnits + ",";
	}

	// Dynamic buffers
	var dynamicBuffersElement = document.getElementById("dynamic_buffers");
	if (!dynamicBuffersElement.disabled && !dynamicBuffersElement.checked) {
		buffersString += "nodynamic";
	}

	// Add brackets if necessary
	buffersString = removeFinalCommaIfPresent(buffersString);
	if (buffersString.indexOf(",") != -1) {
		buffersString = "{" + buffersString + "}";
	}

	// Add prefix and trailing comma if the string isn't empty
	if (buffersString != "") {
		buffersString = "buffers=" + buffersString + ",";
	}

	var regularOutputString = "";
	var exceptionOutputString = "";

	// Regular output file
	// output=<filename>[,sizem[,<generations>]]
	// This field is optional (can trigger snap traces instead)
	var fileElement = document.getElementById("file_text");
	if (!fileElement.disabled) {
		var fileString = fileElement.value;
		if (fileString != "") {
			// File name
			regularOutputString += fileString + ",";

			// Max size and generations
			var maxSize = document.getElementById("output_size").value;
			var maxGenerations = document.getElementById("output_generations").value;
			if (maxSize != 0) {
				regularOutputString = "{" + regularOutputString + maxSize + "m,";
				if (maxGenerations > 1) {
					regularOutputString += maxGenerations;
				}
				regularOutputString = removeFinalCommaIfPresent(regularOutputString);
				regularOutputString += "},";
			}
			regularOutputString = "output=" + regularOutputString;
		}
	}

	// Exception output file
	// exception.output=<filename>[,nnnm]
	// This field is *mandatory* if the Exception destination is selected
	fileElement = document.getElementById("file_text_exception");
	if (!fileElement.disabled) {
		// File name
		exceptionOutputString += fileElement.value + ",";

		// Maximum size
		var maxSize = document.getElementById("output_size_exception").value;
		if (maxSize != 0) {
			exceptionOutputString = "{" + exceptionOutputString + maxSize + "m},";
		}
		exceptionOutputString = "exception.output=" + exceptionOutputString;
	}

	var outputString = buffersString + regularOutputString + exceptionOutputString;

	return removeFinalCommaIfPresent(outputString);
}

// Return true if a string contains characters that are reserved on some platforms
// Otherwise return false
function containsReservedChars(string) {
	if (string.indexOf("\\") != -1
		|| string.indexOf("/") != -1
		|| string.indexOf(":") != -1
		|| string.indexOf("*") != -1
		|| string.indexOf("?") != -1
		|| string.indexOf("\"") != -1
		|| string.indexOf("<") != -1
		|| string.indexOf(">") != -1
		|| string.indexOf("|") != -1
	) {
		return true;
	} else {
		return false;
	}
}

function setErrorStyle(inputElement) {
	// Only set the error style if this element doesn't have focus.
	if (document.activeElement != inputElement) {
		if (inputElement.type == "checkbox") {
			inputElement.style.outline = "2px solid red";
		} else {
			inputElement.style.borderColor = "red";
			inputElement.style.borderStyle = "solid";
		}
	}
}

function unsetErrorStyle(inputElement) {
	if (inputElement.type == "checkbox") {
		inputElement.style.outline = "";
	} else {
		inputElement.style.borderColor = "";
		inputElement.style.borderStyle = "";
	}
}

function escapeHTML(text) {
	return text.replace(/&/g, "&amp;")
			   .replace(/</g, "&lt;")
			   .replace(/>/g, "&gt;")
			   .replace(/"/g, "&quot;")
			   .replace(/'/g, "&#039;");
}

// Inserts text in a target text input, replacing the current selected text
// Also gives focus to the target text input
function insertText(targetElement, textToInsert) {
	var oldTextValue = targetElement.value;
	var selectionStart = targetElement.selectionStart;
	var selectionEnd = targetElement.selectionEnd;

	// Get text before/after current selection
	var textBeforeSelection = oldTextValue.substring(0, selectionStart);
	var textAfterSelection = oldTextValue.substring(selectionEnd, oldTextValue.length);

	// Insert text, effectively replacing the current selection
	targetElement.value = textBeforeSelection + textToInsert + textAfterSelection;

	// Set cursor position to the end of the inserted text
	var cursorPosition = selectionStart + textToInsert.length;

	// Make sure nothing is selected
	targetElement.selectionStart = cursorPosition;
	targetElement.selectionEnd = cursorPosition;

	// Give focus to the target field
	targetElement.focus();
}

function copyTextToClipboard(element) {
	var selection = window.getSelection(); // get the window's Selection object
	selection.removeAllRanges(); // deselect any user selected text

	// Create a temporary element and store the target element's text in it
	// (while stripping out any HTML tags)
	var tempElement = document.createElement("p");
	tempElement.innerText = element.innerText;

	// Append temporary element to the DOM so we can copy its contents
	document.body.appendChild(tempElement);

	var range = document.createRange(); // create a new range object
	range.selectNodeContents(tempElement); // set range to cover target element text
	selection.addRange(range); // add range to Selection object

	document.execCommand("copy"); // do the copy
	selection.removeAllRanges(); // deselect the target element's text

	// Remove the temporary text area
	tempElement.parentNode.removeChild(tempElement);
}

function copyLinkToClipboard() {
	var serializedForm = "";

	// Serialize the tracepoints
	var tracepointListElements = document.getElementById("tracepoint_input").getElementsByTagName("li");
	for (var i = 0; i < tracepointListElements.length; i++) {
		var type = tracepointListElements[i].getAttribute("data-type");
		var serializedTracepoint = "";
		var tracepointFormElements = tracepointListElements[i].getElementsByTagName("*");
		for (var j = 0; j < tracepointFormElements.length; j++) {
			// Get the element ID and modify the index
			var elementId = tracepointFormElements[j].id.replace(/\d+/g, i);

			switch (tracepointFormElements[j].tagName) {
				case "SELECT":
					// id = selected value
					var selectedValue = getSelectedElement(tracepointFormElements[j]).value;
					serializedTracepoint += elementId + "=" + selectedValue + "&";
					break;

				case "INPUT":
					if (tracepointFormElements[j].type == "text" && tracepointFormElements[j].value != "") {
						// id = URI encoded value
						serializedTracepoint += elementId + "=";
						serializedTracepoint += encodeURIComponent(tracepointFormElements[j].value);
						serializedTracepoint += "&";
					}
					if (tracepointFormElements[j].type == "radio" && tracepointFormElements[j].checked) {
						// id = 1 (checked) (unchecked radio options are not needed)
						serializedTracepoint += elementId + "=1&";
					}
					if (tracepointFormElements[j].type == "checkbox") {
						// id = 0|1 (unchecked|checked)
						serializedTracepoint += elementId + "=";
						if (tracepointFormElements[j].checked) {
							serializedTracepoint += "1&";
						} else {
							serializedTracepoint += "0&";
						}
					}
					break;
			}
		}
		// URI encode the whole lot and use the result as the value for the tracepoint parameter
		serializedForm += "tracepoint_" + type + "_" + i + "=";
		serializedForm += encodeURIComponent(removeFinalAmpersandIfPresent(serializedTracepoint));
		serializedForm += "&";
	}

	// Serialize the methods
	var methodListElements = document.getElementById("method_input").getElementsByTagName("li");
	for (var i = 0; i < methodListElements.length; i++) {
		var regexArray = methodListElements[i].id.match(/method_(\d+)/)
		var methodIndex = regexArray[1];

		// Method text/spec
		var methodText = document.getElementById("meth_text_" + methodIndex).value;

		// Args checkbox
		var methodArgs = 0;
		if (document.getElementById("meth_args_" + methodIndex).checked) {
			methodArgs = 1;
		}

		var serializedMethod = "meth_text_" + i + "=" + encodeURIComponent(methodText) + "&" +
							   "meth_args_" + i + "=" + methodArgs;

		// URI encode the whole lot and use the result as the value for the method parameter
		serializedForm += "method_" + i + "=" + encodeURIComponent(serializedMethod) + "&";
	}

	// Serialize the triggers
	var triggerListElements = document.getElementById("trigger_input").getElementsByTagName("li");
	for (var i = 0; i < triggerListElements.length; i++) {
		var type = triggerListElements[i].getAttribute("data-type");
		var serializedTrigger = "";
		var triggerFormElements = triggerListElements[i].getElementsByTagName("*");
		for (var j = 0; j < triggerFormElements.length; j++) {
			// Get the element ID and modify the index
			var elementId = triggerFormElements[j].id.replace(/\d+/g, i);

			switch (triggerFormElements[j].tagName) {
				case "SELECT":
					// id = selected value
					var selectedValue = getSelectedElement(triggerFormElements[j]).value;
					serializedTrigger += elementId + "=" + selectedValue + "&";
					break;

				case "INPUT":
					if (triggerFormElements[j].type == "text" && triggerFormElements[j].value != "") {
						// id = URI encoded value
						serializedTrigger += elementId + "=";
						serializedTrigger += encodeURIComponent(triggerFormElements[j].value);
						serializedTrigger += "&";
					}

					if (triggerFormElements[j].type == "number" && triggerFormElements[j].value != 0) {
						// id = value
						serializedTrigger += elementId + "=" + triggerFormElements[j].value + "&";
					}
					break;
			}
		}
		// URI encode the whole lot and use the result as the value for the tracepoint parameter
		serializedForm += "trigger_" + type + "_" + i + "=";
		serializedForm += encodeURIComponent(removeFinalAmpersandIfPresent(serializedTrigger));
		serializedForm += "&";
	}

	// Serialize select elements outside tracepoints/methods/triggers
	var selectElements = document.getElementById("XtraceForm").getElementsByTagName("select");
	for (var i = 0; i < selectElements.length; i++) {
		// Ignore any elements which are part of tracepoints/methods/triggers
		if (selectElements[i].id.indexOf("tp_") == -1
			&& selectElements[i].id.indexOf("meth_") == -1
			&& selectElements[i].id.indexOf("trig_") == -1)
		{
			// id = value
			var selectedValue = getSelectedElement(selectElements[i]).value;
			serializedForm += selectElements[i].id + "=" + selectedValue + "&";
		}
	}

	// Serialize input elements outside tracepoints/methods/triggers
	var inputElements = document.getElementById("XtraceForm").getElementsByTagName("input");
	for (var i = 0; i < inputElements.length; i++) {
		// Ignore any elements which are part of tracepoints/methods/triggers
		if (inputElements[i].id.indexOf("tp_") == -1
			&& inputElements[i].id.indexOf("meth_") == -1
			&& inputElements[i].id.indexOf("trig_") == -1)
		{
			if (inputElements[i].type == "text" && inputElements[i].value != "") {
				// id = URI encoded value
				serializedForm += inputElements[i].id + "=";
				serializedForm += encodeURIComponent(inputElements[i].value);
				serializedForm += "&";
			}

			if (inputElements[i].type == "number" && inputElements[i].value != 0) {
				// id = value
				serializedForm += inputElements[i].id + "=" + inputElements[i].value + "&";
			}

			if (inputElements[i].type == "checkbox") {
				// id = 0|1 (unchecked|checked)
				serializedForm += inputElements[i].id + "=";
				if (inputElements[i].checked) {
					serializedForm += "1&";
				} else {
					serializedForm += "0&";
				}
			}
		}
	}

	// Remove final ampersand
	serializedForm = removeFinalAmpersandIfPresent(serializedForm);

	// Get the base URL
	var urlString = window.location.protocol + '//' + window.location.host + window.location.pathname;

	// Append the serialized form data
	urlString += "?" + serializedForm;

	// Create a temporary element and store the URL in it
	var tempElement = document.createElement("p");
	tempElement.innerHTML = urlString;

	// Append temporary element to the DOM so we can copy its contents
	document.body.appendChild(tempElement);

	// Copy to the clipboard
	copyTextToClipboard(tempElement);

	// Remove the temporary text area
	tempElement.parentNode.removeChild(tempElement);
}

// Reloads (resets) the page and sets all options back to their initial states according to the URL
function reload() {
	if (confirm("Are you sure you want to reset all options to initial values?")) {
		location.reload();
	} else {
		// Do nothing
	}
}

// Reloads the page and sets all options back to the defaults
function clearAndReload() {
	if (confirm("Are you sure you want to set all options to default values?")) {
		location.replace(window.location.pathname);
	} else {
		// Do nothing
	}
}

// This is the alternative action to submitting the form when the user presses return in a text field
function handleSubmit() {
	event.preventDefault();
	processChange("none");
	return false;
}
