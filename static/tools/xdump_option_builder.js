var compatibleEventElementIds = {};
compatibleEventElementIds["vmstop"]     = ["event_vmstop", "event_vmstop_filter"];
compatibleEventElementIds["load"]       = ["event_load", "event_unload", "event_class_filter"];
compatibleEventElementIds["unload"]     = ["event_load", "event_unload", "event_class_filter"];
compatibleEventElementIds["throw"]      = ["event_throw", "event_catch", "event_uncaught", "event_systhrow", "event_throwable_class", "event_throwable_method", "event_throwable_msg_filter"];
compatibleEventElementIds["catch"]      = ["event_throw", "event_catch", "event_uncaught", "event_systhrow", "event_throwable_class", "event_throwable_method", "event_throwable_msg_filter"];
compatibleEventElementIds["uncaught"]   = ["event_throw", "event_catch", "event_uncaught", "event_systhrow", "event_throwable_class", "event_throwable_method", "event_throwable_msg_filter"];
compatibleEventElementIds["systhrow"]   = ["event_throw", "event_catch", "event_uncaught", "event_systhrow", "event_throwable_class", "event_throwable_method", "event_throwable_msg_filter"];
compatibleEventElementIds["allocation"] = ["event_allocation", "event_allocation_filter_size_min", "event_allocation_filter_units_min", "event_allocation_filter_size_max", "event_allocation_filter_units_max"];
compatibleEventElementIds["slow"]       = ["event_slow", "event_slow_filter"];

var filterElementIds = {};
filterElementIds["vmstop"]     = ["event_vmstop_filter"];
filterElementIds["load"]       = ["event_class_filter"];
filterElementIds["unload"]     = ["event_class_filter"];
filterElementIds["throw"]      = ["event_throwable_class", "event_throwable_method", "event_throwable_msg_filter", "event_throwable_offset"];
filterElementIds["catch"]      = ["event_throwable_class", "event_throwable_method", "event_throwable_msg_filter", "event_throwable_offset"];
filterElementIds["uncaught"]   = ["event_throwable_class", "event_throwable_method", "event_throwable_msg_filter", "event_throwable_offset"];
filterElementIds["systhrow"]   = ["event_throwable_class", "event_throwable_method", "event_throwable_msg_filter", "event_throwable_offset"];
filterElementIds["allocation"] = ["event_allocation_filter_size_min", "event_allocation_filter_units_min", "event_allocation_filter_size_max", "event_allocation_filter_units_max"];
filterElementIds["slow"]       = ["event_slow_filter"];

var agentsRequiringRequest = {};
agentsRequiringRequest["serial"] = ["snap", "jit", "ceedump"];
agentsRequiringRequest["exclusive"] = ["heap", "system", "java", "snap", "jit", "console", "ceedump"];
agentsRequiringRequest["prepwalk"] = ["heap", "system"];
agentsRequiringRequest["preempt"] = ["java"];

var noHeapdumpEventElementIds = ["event_gpf", "event_traceassert", "event_abort"];
var agentsThatDumpAFileIds = ["agent_system", "agent_java", "agent_heap", "agent_snap", "agent_jit"];

var fileDsnTokenTargetElement = null;

var toolExecMouseDown = false;
document.addEventListener("mouseup", clearToolExecMouseDown);

window.onload = initialSetup();

function initialSetup() {
	document.getElementById("XdumpForm").addEventListener(                    'submit', handleSubmit);
	
	document.getElementById("exec").addEventListener(                         'change', processChange.bind(null, document.getElementById("exec")));
	document.getElementById("exec").addEventListener(                         'blur', processChange.bind(null, document.getElementById("exec")));
	
	document.getElementById("tool_async").addEventListener(                   'change', processChange.bind(null, document.getElementById("tool_async")));
	document.getElementById("tool_wait").addEventListener(                    'change', processChange.bind(null, document.getElementById("tool_wait")));
	
	document.getElementById("priority").addEventListener(                     'change', processChange.bind(null, document.getElementById("priority")));
	document.getElementById("priority").addEventListener(                     'blur', processChange.bind(null, document.getElementById("priority")));
	
	document.getElementById("wrap_in_quotes").addEventListener(               'change', processChange.bind(null, document.getElementById("wrap_in_quotes")));
	
	document.getElementById("button_copy_to_clipboard").addEventListener(     'click',  copyTextToClipboard.bind(null, document.getElementById('result')));
	document.getElementById("button_copy_link_to_clipboard").addEventListener('click',  copyLinkToClipboard);
	document.getElementById("button_reset").addEventListener(                 'click',  reload);
	document.getElementById("button_clear").addEventListener(                 'click',  clearAndReload);
	
	var allInputs = document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; i++) {
		if (allInputs[i].id.indexOf("event_") != -1) {
			allInputs[i].addEventListener('change', processChange.bind(null, allInputs[i]));
			allInputs[i].addEventListener('blur', processChange.bind(null, allInputs[i]));
		}
		
		if (allInputs[i].id.indexOf("agent_") != -1) {
			allInputs[i].addEventListener('change', processChange.bind(null, allInputs[i]));
		}
		
		if (allInputs[i].id.indexOf("agent_tool") != -1) {
			allInputs[i].addEventListener('mousedown', registerToolExecMouseDown);
		}
		
		if (allInputs[i].id.indexOf("exec_button_") != -1) {
			allInputs[i].addEventListener('mousedown', processChange.bind(null, allInputs[i]));
			allInputs[i].addEventListener('mousedown', registerToolExecMouseDown);
		}
		
		if (allInputs[i].id.indexOf("file_button_") != -1) {
			allInputs[i].addEventListener('click', processChange.bind(null, allInputs[i]));
		}
		
		if (allInputs[i].id.indexOf("request_") != -1) {
			allInputs[i].addEventListener('change', processChange.bind(null, allInputs[i]));
		}
		
		if (allInputs[i].id.indexOf("range_") != -1) {
			allInputs[i].addEventListener('change', processChange.bind(null, allInputs[i]));
			allInputs[i].addEventListener('blur', processChange.bind(null, allInputs[i]));
		}
		
		if (allInputs[i].id.indexOf("_text") != -1) {
			allInputs[i].addEventListener('change', processChange.bind(null, allInputs[i]));
			allInputs[i].addEventListener('blur', registerTokenTarget.bind(null, allInputs[i]));
		}
	}
	
	setupTooltips();
	parseParams();
}

function setupTooltips() {
	var titleText;

	titleText = "Filter on the fully qualified name of the Exception (or Error) class, to reduce the number of dump files " +
	            "produced. Use slashes as package separators. Asterisks as wildcards are supported at the beginning of " +
	            "the string, and/or at the end if no method filter is specified. Examples:\n\n" +
	            "    - java/lang/OutOfMemoryError\n" +
	            "    - *IOException";
	document.getElementById("event_throwable_class").title = titleText;

	titleText = "Filter on a fully qualified method name to reduce the number of dump files produced. The default stack frame " +
	            "offset is 0, which is the top stack frame - i.e. the method from which the Exception was thrown.\n\n" +
	            "Use slashes as package separators. Asterisks as wildcards are supported at the end of the string. Examples:\n\n" +
	            "    - java/lang/String.getBytes*\n" +
	            "    - java/util/*";
	document.getElementById("event_throwable_method").title = titleText;

	titleText = "Filter on text within the exception message, to reduce the number of dump files produced. Asterisks as " +
	            "wildcards are supported at the beginning and/or end of the string. Examples:\n\n" +
	            "    - *class format*\n" +
	            "    - *access denied*\n";
	document.getElementById("event_throwable_msg_filter").title = titleText;

	titleText = "The stack frame offset allows you to specify the position of the filtered method in the stack. This option is " +
	            "useful if the exception is being thrown from a general purpose or utility class. " +
	            "The default value is 0 (i.e. the top stack frame)";
	document.getElementById("event_throwable_offset").title = titleText;

	titleText = "Filter on the fully qualified Class name, to reduce the number of dump files produced. Asterisks " +
	            "as wildcards are supported at the beginning or end of the string. Use slashes as package separators. Examples:\n\n" +
	            "    - java/lang/String" +
	            "    - java/util/Hash*" +
	            "    - *security*";
	document.getElementById("event_class_filter").title = titleText;

	titleText = "One event can generate multiple dumps. The agents that produce each dump run sequentially and their order is " +
	            "determined by the priority keyword set for each agent. Higher priority dump agents are started first. The " +
	            "priorities associated with default dump agents can be viewed by running \"java -Xdump:what\".";
	document.getElementById("priority").title = titleText;
	
	titleText = "Specify the range of dump events on which to trigger the specified dump agents. For example, if \"First event\" is set to 5, " +
				"and \"Last event\" set to 7, the dump event will trigger only on the 5th, 6th and 7th dump events. A value of 0 means " +
				"\"no limit\"\n\n" +
				"The default is first = 1 and last = 0 except for when the shell command (tool) agent is enabled, whereby the default " +
				" becomes first = 1 and last = 1.";
	document.getElementById("range_li").title = titleText;

	titleText = "The exit agent is only supported from OpenJ9 release 0.18.0 and up.";
	document.getElementById("agent_exit_li").title = titleText;
}

function parseParams() {
	// Note that this code, and the corresponding serialization code in
	// copyLinkToClipboard(), relies on the order of the inputs in the
	// document to work correctly.
	// Elements that can be enabled/disabled automatically must come *after*
	// the elements which control that behaviour. If not, the default values
	// will override the serialized values.
	if (location.search != "") {
		// Get the query part of the URL, remove the leading '?', and split on '&'
		var params = location.search.substring(1).split("&"); // this includes the '?' so need to substring it

		for (var i = 0; i < params.length; i++) {
			var param = params[i].split("=");
			var key = param[0];
			var value = param[1];
    	
			var element = document.getElementById(param[0]);

			if (element == null) {
				console.log("ERROR: Key does not map to element: " + key);
				continue; // Go to the next parameter
			}

			switch (element.type) {
				case "checkbox":
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

				case "text":
					element.value = decodeURIComponent(value);
					break;

				case "number":
					element.value = value;
					break;
			}

			processChange(element);
			element.blur();
		}
	} else {
		// If no parameters were provided, just build the result with the defaults
		buildAndUpdateResult();
	}
}

function processChange(option) {

	if (option.name == "agent") {
		if (option.value == "tool") {
			var execFieldElement = document.getElementById("exec");
			var toolAsyncElement = document.getElementById("tool_async");
			var toolWaitElement = document.getElementById("tool_wait");

			var rangeElement = document.getElementById("range");
			var rangeFirstElement = document.getElementById("range_first");
			var rangeLastElement = document.getElementById("range_last");
			if (option.checked == true) {
				// If range has not been modified, set it to the tool default of 1..1
				if (rangeFirstElement.value == 1 && rangeLastElement.value == 0) {
					rangeFirstElement.value = 1;
					rangeLastElement.value = 1;
				}
				enableInput(execFieldElement);
				enableInput(toolAsyncElement);
				enableInput(toolWaitElement);
				execFieldElement.focus();

				// Tool agent is only compatible with the exit agent, so disable all the other agent inputs
				var agentInputElements = document.getElementById("agent_input").getElementsByTagName("input");
				for (var i = 0; i < agentInputElements.length; i++) {
					if (agentInputElements[i].id.match(/^agent_/) != null && agentInputElements[i].id != "agent_tool" && agentInputElements[i].id != "agent_exit") {
						disableInput(agentInputElements[i]);
					}
				}
			} else {
				// If range has not been modified, set it to the normal default of 1..0
				if (rangeFirstElement.value == 1 && rangeLastElement.value == 1) {
					rangeFirstElement.value = 1;
					rangeLastElement.value = 0;
				}
				disableInput(execFieldElement);
				disableInput(toolAsyncElement);
				disableInput(toolWaitElement);

				// Enable all agent inputs now that the tool agent is unchecked
				var agentInputElements = document.getElementById("agent_input").getElementsByTagName("input");
				for (var i = 0; i < agentInputElements.length; i++) {
					if (agentInputElements[i].id.match(/^agent_/) != null) {
						enableInput(agentInputElements[i]);
					}
				}
			}		
		}

		// The tool agent is only compatible with the exit agent
		if (option.value != "tool" && option.value != "exit") {
			if (option.checked == true) {
				// Disable tool if any agent other than exit is checked
				disableInput(document.getElementById("agent_tool"));
			} else {
				// Enable tool if no other agents are checked, or only exit is checked
				var agentInputElements = document.getElementById("agent_input").getElementsByTagName("input");
				var enableToolAgent = true;
				for (var i = 0; i < agentInputElements.length; i++) {
					if (agentInputElements[i].id.match(/^agent_/) != null && agentInputElements[i].id != "agent_exit" && agentInputElements[i].checked) {
						enableToolAgent = false;
						break;
					}
				}

				if (enableToolAgent) {
					enableInput(document.getElementById("agent_tool"));
				}			
			}
		}

		configureRequestOptions(option.value);
	}

	// Prepwalk can only be checked if exclusive access is also checked
	if (option.value == "prepwalk") {
		// Exclusive access must be checked if prepwalk is checked
		if (option.checked == true) {
			document.getElementById("request_exclusive").checked = true;
		}
	} else if (option.value == "exclusive") {
		// If exclusive access gets unchecked, uncheck prepwalk
		if (option.checked == false) {
			document.getElementById("request_prepwalk").checked = false;
		}
	}    

	// Enable range number fields when range is checked
	if (option.name == "range") {
		if (option.checked == true) {
			enableInput(document.getElementById("range_first"));
			enableInput(document.getElementById("range_last"));			
		} else {
			disableInput(document.getElementById("range_first"));
			disableInput(document.getElementById("range_last"));			
		}
	}

	// Set a sensible default value for the range fields if the user enters an empty value
	if (option.name == "range_first") {
	    if (option.value == "") {
    	    option.value = 1;
		}
	} else if (option.name == "range_last") {
	    if (option.value == "") {
    	    option.value = 0;
		}
	}

	// Fix obvious mistakes in class name filters
	if (option.name == "throwable_class" || option.name == "class_text") {
		// Remove any whitespace
		option.value = option.value.replace(/\s/g,'');

		// Replace dots with slashes
		option.value = option.value.replace(/\./g, "/");		
	}

	// Attempt to correct common formatting mistakes in the method filter
	if (option.name == "throwable_method") {
	// Remove any whitespace
		option.value = option.value.replace(/\s/g,'');

		// Check for more than one dot in the string
		if (option.value.indexOf(".") != -1 && (option.value.indexOf(".") != option.value.lastIndexOf("."))) {
			// Replace dots with slashes until there is only one dot left
			// This is a best effort, and isn't always going to work
			while (option.value.indexOf(".") != option.value.lastIndexOf(".")) {
				option.value = option.value.replace(".", "/");
			}
		}	
	}

	// Enable/disable events that are incompatible with the one that has been changed
	if (option.name == "event") {
		if (option.getAttribute("data-hasfilter") == "true") {
			if (option.checked == true) {
				// Disable events that are not compatible with this event
				disableIncompatibleEventElements(compatibleEventElementIds[option.value]);

				// Enable relevant filters
				var filterIds = filterElementIds[option.value];
				for (var i = 0; i < filterIds.length; i++) {
					enableInput(document.getElementById(filterIds[i]));
				}
			} else { // Event has been unchecked
				var compatibleEventIds = compatibleEventElementIds[option.value];
				var compatibleEventChecked = false;

				// Check whether any events that are compatible with this one are still checked
				for (var i = 0; i < compatibleEventIds.length; i++) {
					if (document.getElementById(compatibleEventIds[i]).type == "checkbox" && document.getElementById(compatibleEventIds[i]).checked) {
						compatibleEventChecked = true;
					}
				}

				// If no compatible events are checked, enable *all* events and disable filter(s) associated with this event
				if (!compatibleEventChecked) {
					enableEventElementsWithFilters(option);
					var filterIds = filterElementIds[option.value];
					for (var i = 0; i < filterIds.length; i++) {
						disableInput(document.getElementById(filterIds[i]));
					}
				}
			}
		}
	}

	// If event_throw is checked, automatically check event_systhrow as well
	if (option.name == "event" && option.value == "throw" && option.checked == true) {
		document.getElementById("event_systhrow").checked = true;
	}

	// The gpf, traceassert, and abort events cannot trigger a heap dump,
	// prepare the heap (request=prepwalk), or compact the heap (request=compact)
	if (heapIncompatibleEventChecked() && !heapCompatibleEventChecked()) { 
		disableInput(document.getElementById("agent_heap"));
		disableInput(document.getElementById("request_prepwalk"));
		disableInput(document.getElementById("request_compact"));
	} else {
		// The heap agent is not compatible with the tool agent, so only enable heap if tool is not in use
		var toolAgentElement = document.getElementById("agent_tool");
		if (toolAgentElement.disabled || !toolAgentElement.checked) {
			enableInput(document.getElementById("agent_heap"));
		}
		enableInput(document.getElementById("request_prepwalk"));
		enableInput(document.getElementById("request_compact"));
	}

	// File pattern and data set pattern fields. Rules:
	//   1. Only system dumps are compatible with the data set pattern field
	//   2. File pattern and data set pattern cannot be specified at the same time
	var dsnTextElement = document.getElementById("dsn_text");
	var fileTextElement = document.getElementById("file_text");

	// Enable or disable the data set pattern field
	var systemAgentElement = document.getElementById("agent_system");
	if (systemAgentElement.checked) {
		if (fileTextElement.value != "") {
			// File pattern field takes precedence if it contains any text
			disableInput(dsnTextElement);
		} else {
			enableInput(dsnTextElement);
		}
	} else {
		enableDsnIncompatibleAgents();
		disableInput(dsnTextElement);
	}

	// Enable or disable the file pattern field
	if (fileCompatibleAgentEnabledAndChecked()) {
		if (!dsnTextElement.disabled && dsnTextElement.value != "") {
			disableDsnIncompatibleAgents();
			disableInput(fileTextElement);
		} else {
			enableDsnIncompatibleAgents();
			enableInput(fileTextElement);
		}
	} else {
		disableInput(fileTextElement);
	}

	// Enable/disable file/dsn token buttons
	if (!dsnTextElement.disabled || !fileTextElement.disabled) {
		enableDumpNameTokenButtons();
	} else {
		disableDumpNameTokenButtons();
	}

	// Insert text in the target text input if one of the token buttons is pressed
	if (option.type == "button") {
		if (option.getAttribute("data-target") == null && fileDsnTokenTargetElement != null) {
			insertText(fileDsnTokenTargetElement, option.getAttribute("data-token"));
		} else {
			insertText(document.getElementById(option.getAttribute("data-target")), option.getAttribute("data-token"));
		}
	}

	// Remove focus from input element (ensures error styling works correctly)
	if (option.id != null) {
		option.blur();
	}

	// Build the result string and display it
	buildAndUpdateResult();
}

// Check/uncheck recommended request options when the specified agent has been changed
function configureRequestOptions(agent) {
	var requestsToConfigure = Object.keys(agentsRequiringRequest);
	for (var i = 0; i < requestsToConfigure.length; i++) {
		if (agentNeedsRequest(agent, requestsToConfigure[i])) {
			if (document.getElementById("agent_" + agent).checked == true) {
				document.getElementById("request_" + requestsToConfigure[i]).checked = true;
			} else if (!enabledAgentsNeedRequest(requestsToConfigure[i])) {
				document.getElementById("request_" + requestsToConfigure[i]).checked = false;
			}
		}
	}
}

// Returns true if the specified agent should run with the specified request option
// Otherwise returns false
function agentNeedsRequest(agent, request) {
	var agentsForRequest = agentsRequiringRequest[request];
	for (var i = 0; i < agentsForRequest.length; i++) {
		if (agent == agentsForRequest[i]) {
			return true;
		}	
	}
	return false;	
}

// Returns true if any enabled agents should run with the specified request option
// Otherwise returns false
function enabledAgentsNeedRequest(request) {
	var agentsForRequest = agentsRequiringRequest[request];
	for (var i = 0; i < agentsForRequest.length; i++) {
		if (document.getElementById("agent_" + agentsForRequest[i]).checked) {
			return true;
		}	
	}	
	return false;    
}

function heapCompatibleEventChecked() {
	var section = document.getElementById("event_input");
	var elements = section.getElementsByTagName("input");
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].checked) {
			// This element is checked - check whether it is a heap-compatible event
			var isCompatibleEvent = true;
			for (var j = 0; j < noHeapdumpEventElementIds.length; j++) {
				if (elements[i].id == noHeapdumpEventElementIds[j]) {
					isCompatibleEvent = false;
				}
			}
			if (isCompatibleEvent) {
				return true;
			}			
		}
	}
	// If we reach here, no heap-compatible events were checked
	return false;
}

function heapIncompatibleEventChecked() {
	for (var i = 0; i < noHeapdumpEventElementIds.length; i++) {
		if (document.getElementById(noHeapdumpEventElementIds[i]).checked) {
			return true;
		}	
	}
	return false;
}

function fileCompatibleAgentEnabledAndChecked() {
	for (var i = 0; i < agentsThatDumpAFileIds.length; i++) {
		var agentElement = document.getElementById(agentsThatDumpAFileIds[i]);
		if (!agentElement.disabled && agentElement.checked) {
			return true;
		}
	}
}

function disableDsnIncompatibleAgents() {
	for (var i = 0; i < agentsThatDumpAFileIds.length; i++) {
		if (agentsThatDumpAFileIds[i] != "agent_system") {
			disableInput(document.getElementById(agentsThatDumpAFileIds[i]));
		}
	}
}

function enableDsnIncompatibleAgents() {
	for (var i = 0; i < agentsThatDumpAFileIds.length; i++) {
		if (agentsThatDumpAFileIds[i] != "agent_system") {
			enableInput(document.getElementById(agentsThatDumpAFileIds[i]));
		}
	}
}

function disableIncompatibleEventElements(compatibleEventElementIds) {
	// need to pass an array so we can deal with throw/systhrow etc.
	var section = document.getElementById("event_input");
	var elements = section.getElementsByTagName("input");
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].getAttribute("data-hasfilter") == "true" || elements[i].type == "text") {
			var compatible = false;
			for (var j = 0; j < compatibleEventElementIds.length; j++) {
				if (elements[i].id == compatibleEventElementIds[j]) {
					compatible = true;
				}
			}
			if (!compatible) { 
				disableInput(elements[i]);
			}
		}
	}
}

function enableEventElementsWithFilters() {
	var section = document.getElementById("event_input");
	var elements = section.getElementsByTagName("input");
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].type == "checkbox" && elements[i].getAttribute("data-hasfilter") == "true") {
			enableInput(elements[i]);
		}
	}
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

function enableDumpNameTokenButtons() {
	var allInputs = document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; i++) {
		if (allInputs[i].id.indexOf("file_button_") != -1) {
			allInputs[i].disabled = false;
		}
	}
}

function disableDumpNameTokenButtons() {
	var allInputs = document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; i++) {
		if (allInputs[i].id.indexOf("file_button_") != -1) {
			allInputs[i].disabled = true;
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
		if (allInputs[i].type == "button" && allInputs[i].getAttribute("data-target") == inputElement.id) {
			results.push(allInputs[i]);
		}
	}
	return results;
}

function buildAndUpdateResult() {
	var resultString = "-Xdump:";	

	var agentString = "";
	var eventString = "";
	var filterString = "";

	// Agents
	var section = document.getElementById("agent_input");
	var agentElements = section.getElementsByTagName("input");
	for (var i = 0; i < agentElements.length; i++) {
		if (!agentElements[i].disabled && agentElements[i].checked == true && agentElements[i].id != "tool_async") {
			if (agentString != "") {
				agentString += "+";
			}
			agentString += agentElements[i].value;
		}
	}
	if (agentString != "") {
		resultString += agentString;
	}

	// Events and filters
	var eventSection = document.getElementById("event_input");
	var eventElements = eventSection.getElementsByTagName("input");

	// Need to make sure filters are only added once for throw/systhrow, load/unload etc.
	var filterAdded = {};
	for (var i = 0; i < eventElements.length; i++) {
		if (eventElements[i].name != "event") {
			// If it's not an event it's a filter - mark it as not added yet
			filterAdded[eventElements[i]] = false;
		}
	}

	for (var i = 0; i < eventElements.length; i++) {
		if (eventElements[i].name == "event" && eventElements[i].checked == true) {
			if (eventString != "") {
				eventString += "+";
			}
			eventString += eventElements[i].value;

			// Filters
			if (eventElements[i].getAttribute("data-hasfilter") == "true") {
				var filterIds = filterElementIds[eventElements[i].value];

				for (var j = 0; j < filterIds.length; j++ ) {
					var tempString = document.getElementById(filterIds[j]).value;

					if (tempString == "" || filterAdded[filterIds[j]]) {
						// Filter is empty or has already been added
						continue;					
					}

					// Get contents of filters and augment/correct if necessary
					if (filterIds[j] == "event_throwable_class") {
						filterString += tempString;
					} else if (filterIds[j] == "event_throwable_method") {
						filterString += "#" + tempString;
					} else if (filterIds[j] == "event_throwable_msg_filter") {
						// Do nothing. This is added to the result under a separate flag later on.
					} else if (filterIds[j] == "event_throwable_offset") {
						if (tempString != "0" && document.getElementById("event_throwable_method").value != "") {
							filterString += "#" + tempString;
						} else {
							continue;
						}							
					} else if (filterIds[j] == "event_vmstop_filter") {
						filterString += "#" + tempString;
					} else if (filterIds[j] == "event_slow_filter") {
						filterString += "#" + tempString + "ms";
					} else if (filterIds[j] == "event_allocation_filter_size_min") {
						filterString += "#" + tempString;
					} else if (filterIds[j] == "event_allocation_filter_size_max") {
						filterString += ".." + tempString;
					} else if (filterIds[j] == "event_allocation_filter_units_min" && document.getElementById("event_allocation_filter_size_min").value == "") {
						// Don't add units if size is empty
					} else if (filterIds[j] == "event_allocation_filter_units_max" && document.getElementById("event_allocation_filter_size_max").value == "") {
						// Don't add units if size is empty
					} else {
						// Can add the filter value as-is for all other filters
						filterString += tempString;
					}

					filterAdded[filterIds[j]] = true;
				}
			}
		}
	}
	if (eventString != "") {
		resultString += ":events=" + eventString;
	}
	if (filterString != "") {
		resultString += ",filter=" + filterString;
	}

	// msg_filter
	var messageFilterStringElement = document.getElementById("event_throwable_msg_filter");
	if (messageFilterStringElement.disabled == false && messageFilterStringElement.value != "") {
		resultString += ",msg_filter=" + messageFilterStringElement.value;
	}

	// range
	var rangeFirst = document.getElementById("range_first").value;
	var rangeLast = document.getElementById("range_last").value;
	if (document.getElementById("agent_tool").checked) {
		// Default with "tool" agent enabled is 1..1
		if (rangeFirst != 1 || rangeLast != 1) {
			resultString += ",range=" + rangeFirst + ".." + rangeLast;
		}
	} else {
		// Normal default is 1..0
		if (rangeFirst != 1 || rangeLast != 0) {
			resultString += ",range=" + rangeFirst + ".." + rangeLast;
		}	
	}
	
	// priority
	var priority = document.getElementById("priority").value;
	if (priority != "") {
		resultString += ",priority=" + priority;
	}

	// exec
	if (document.getElementById("agent_tool").checked) {
        var execString = document.getElementById("exec").value;
		if (execString != "") {
			resultString += ",exec=" + execString;
		}
		
		// opts
		var optsString = "";
		var toolAsyncElement = document.getElementById("tool_async");
		var toolWaitElement = document.getElementById("tool_wait");
		if (toolAsyncElement.checked) {
			optsString += toolAsyncElement.value;
		}
		if (toolWaitElement.value != 0) {
			if (optsString != "") {
				optsString += "+";
			}
			optsString += "WAIT" + toolWaitElement.value;
			}
		if (optsString != "") {
			resultString += ",opts=" + optsString;
		}
	}

	// request
	var requestSection = document.getElementById("request_input");
	var requestElements = requestSection.getElementsByTagName("input");
	var requestString = "";
	for (var i = 0; i < requestElements.length; i++) {
		if (!requestElements[i].disabled && requestElements[i].checked) {
			if (requestElements[i].value != "preempt" || (requestElements[i].value == "preempt" && document.getElementById("agent_java").checked == true)) {
				if (requestString != "") {
					requestString += "+";
				}
				requestString += requestElements[i].value;
			}
		}
	}
	if (requestString != "") {
		resultString += ",request=" + requestString;
	}

	// Dump file name
	var fileElement = document.getElementById("file_text");
	if (!fileElement.disabled) {
		if (fileElement.value != "") {
			resultString += ",file=" + fileElement.value;
		}
	}
	
	// SYSTDUMP data set name
	var dsnElement = document.getElementById("dsn_text");
	if (!dsnElement.disabled) {
		if (dsnElement.value != "") {
			resultString += ",dsn=" + dsnElement.value;
		}
	}

	// Wrap in quotes if option checked
	if (document.getElementById("wrap_in_quotes").checked) {
		// Escape backslashes
		resultString = resultString.replace(/\\/g, "\\\\");

		// Escape quotes
		resultString = resultString.replace(/"/g, "\\\"");

		// Wrap the entire result string in quotes
		resultString = "\"" + resultString + "\"";
	}

	// Escape HTML characters
	resultString = escapeHTML(resultString);

	// Add <wbr> tags after '+', ','. '/' and '=' characters
	// to make the wrapping prettier for longer options
	resultString = resultString.replace(/,/g, ",<wbr>");
	resultString = resultString.replace(/\+/g, "+<wbr>");
	resultString = resultString.replace(/\//g, "/<wbr>");
	resultString = resultString.replace(/=/g, "=<wbr>");

	// Rudimentry checks for validity of result
	var resultIsGreen = true;
	var errorsHtml = "";
	var warningsHtml = "";

	// Check whether any dump events are selected
	if (eventString == "") {
		resultIsGreen = false;
		errorsHtml += "ERROR: No dump event selected<br>";		
	}

	// Check whether any dump agents are selected
	if (agentString == "") {
		resultIsGreen = false;
		errorsHtml += "ERROR: No dump agent selected<br>";		
	}

	// Check object allocation filter sizes
	var minimumSizeElement = document.getElementById("event_allocation_filter_size_min");
	var maximumSizeElement = document.getElementById("event_allocation_filter_size_max");
	if (document.getElementById("event_allocation").checked) {
		// Minimum must be specified, it must be greater than or equal to 0, and it must be less than the maximum
		if (minimumSizeElement.value == "" || minimumSizeElement.value < 0 || (maximumSizeElement.value != "" && minimumSizeElement.value > maximumSizeElement.value)) {
			resultIsGreen = false;
			setErrorStyle(minimumSizeElement);
			errorsHtml += "ERROR: Invalid minimum size for object allocation size filter: must be >= 0, and must be < maximum size<br>";		
		} else {
			unsetErrorStyle(minimumSizeElement);
		}

		// Maxmimum can be omitted, but if it is specified it must be greater than zero, and greater than the minimum.
		if (maximumSizeElement.value != "" && (maximumSizeElement.value <= 0 || (minimumSizeElement.value != "" && minimumSizeElement.value > maximumSizeElement.value))) {
			resultIsGreen = false;
			setErrorStyle(maximumSizeElement);
			errorsHtml += "ERROR: Invalid maximum size for object allocation size filter: must be > 0, and must be > minimum size<br>";		
		} else {
			unsetErrorStyle(maximumSizeElement);
		}
	} else {
		// Ensure error styling is removed if this option is unchecked
		unsetErrorStyle(minimumSizeElement);
		unsetErrorStyle(maximumSizeElement);
	}

	// Check that a command has been specified if the tool agent is selected
	var execElement = document.getElementById("exec");
	if (document.getElementById("agent_tool").checked && execElement != document.activeElement && !toolExecMouseDown) {
		if (execElement.value == "") {
			resultIsGreen = false;
			setErrorStyle(execElement);
			errorsHtml += "ERROR: Shell command (tool) agent is checked, but no shell command has been specified<br>";
		} else if (execElement.value.indexOf(",") != -1) {
			resultIsGreen = false;
			setErrorStyle(execElement);
			errorsHtml += "ERROR: Invalid shell command: must not contain a comma.<br>";
		} else {
			unsetErrorStyle(execElement);
		}
	} else {
		unsetErrorStyle(execElement);
	}
	
	// Check value provided for tool wait time
	var toolWaitElement = document.getElementById("tool_wait");
	if (!toolWaitElement.disabled && toolWaitElement.value < 0) {
		resultIsGreen = false;
		setErrorStyle(toolWaitElement);
		errorsHtml += "ERROR: Invalid tool wait time: must be > 0<br>";
	} else {
		unsetErrorStyle(toolWaitElement);
	}

	// Check validity of the throwable class filter. Rules:
	//    1. Can start with a wildcard character
	//    2. Can end with a wildcard character if no method filter is specified
	//    3. Can contain just a single wildcard character on its own
	//    4. Cannot contain a wildcard in any other location
	//    5. Cannot contain a comma
	var throwableClassHasError = false;
	var throwableClassElement = document.getElementById("event_throwable_class")
	if (!throwableClassElement.disabled) {
		var classValue = throwableClassElement.value;
		
		if (classValue.lastIndexOf("*") > 0) {
			if (classValue.indexOf("*", 1) != (classValue.length - 1)) {
				throwableClassHasError = true;
				errorsHtml += "ERROR: Invalid Exception class filter: wildcards can only be used at the beginning and/or end of the filter<br>";
			} else if (document.getElementById("event_throwable_method").value != "") {
				throwableClassHasError = true
				errorsHtml += "ERROR: Invalid Exception class filter: must not end with a wildcard when a method filter is specified<br>";
			}
		}
		
		if (classValue.indexOf(",") != -1) {
			throwableClassHasError = true;
			errorsHtml += "ERROR: Invalid Exception class filter: must not contain a comma.<br>";
		} 
		
		if (throwableClassHasError) {
			resultIsGreen = false;
			setErrorStyle(throwableClassElement);
		} else {
			unsetErrorStyle(throwableClassElement);
		}
	}

	// Check validity of the throwable method filter. Rules:
	//    1. Can end with a wildcard character if no stack offset is specified
	//    2. Cannot contain a wildcard in any other location
	//    3. Cannot contain a comma	
	var throwableMethodHasError = false;
	var throwableMethodElement = document.getElementById("event_throwable_method");
	if (!throwableMethodElement.disabled) {
		var methodValue = throwableMethodElement.value;

		var wildcardIndex = methodValue.indexOf("*");
		if (wildcardIndex != -1) {
			if (wildcardIndex != (methodValue.length - 1)) {
				throwableMethodHasError = true;
				errorsHtml += "ERROR: Invalid Exception method filter: wildcard can only be used at the end of the filter<br>";
			} else if (document.getElementById("event_throwable_offset").value != "0") {
				throwableMethodHasError = true;
				errorsHtml += "ERROR: Invalid Exception method filter: must not end with a wildcard when using a non-zero stack offset.<br>";
			}		
		}

		if (methodValue.indexOf(",") != -1) {
			throwableMethodHasError = true;
			errorsHtml += "ERROR: Invalid Exception method filter: must not contain a comma.<br>";
		} 

		if (throwableMethodHasError) {
			resultIsGreen = false;
			setErrorStyle(throwableMethodElement);
		} else {
			unsetErrorStyle(throwableMethodElement);
		}
	}

	// Check validity of the throwable message filter string
	var throwableMessageElement = document.getElementById("event_throwable_msg_filter");
	if (throwableMessageElement.value.indexOf(",") != -1) {
		resultIsGreen = false;
		setErrorStyle(throwableMessageElement);
		errorsHtml += "ERROR: Invalid Exception message filter: must not contain a comma.<br>";	
	} else {
		unsetErrorStyle(throwableMessageElement);
	}

	// Check validity of the class load/unload filter string
	var classFilterElement = document.getElementById("event_class_filter");
	if (classFilterElement.value.indexOf(",") != -1) {
		resultIsGreen = false;
		setErrorStyle(classFilterElement);
		errorsHtml += "ERROR: Invalid class load/unload filter: must not contain a comma.<br>";	
	} else {
		unsetErrorStyle(classFilterElement);
	}

	// Dump filename checks
	var dumpFileTextElement = document.getElementById("file_text");
	if (!dumpFileTextElement.disabled && dumpFileTextElement.value != "") {
		if (dumpFileTextElement.value.indexOf(",") != -1) {
			resultIsGreen = false;
			setErrorStyle(dumpFileTextElement);
			errorsHtml += "ERROR: Invalid dump file pattern: must not contain a comma.<br>";
		} else {
			unsetErrorStyle(dumpFileTextElement);
		}

		if (containsReservedChars(dumpFileTextElement.value)) {
			warningsHtml += "WARNING: Dump file pattern contains a character that is disallowed on some platforms<br>";		
		}		
	} else {
		unsetErrorStyle(dumpFileTextElement);
	}

	// SYSTDUMP data set name checks
	var datasetTextElement = document.getElementById("dsn_text");
	if (!datasetTextElement.disabled && datasetTextElement.value != "") {
		if (datasetTextElement.value.indexOf(",") != -1) {
			resultIsGreen = false;
			setErrorStyle(datasetTextElement);
			errorsHtml += "ERROR: Invalid data set pattern: must not contain a comma.<br>";
		} else {
			unsetErrorStyle(datasetTextElement);
		}

		if (containsReservedChars(datasetTextElement.value)) {
			warningsHtml += "WARNING: Data set pattern contains a character that is disallowed on some platforms<br>";		
		}		
	} else {
		unsetErrorStyle(datasetTextElement);
	}

	// Check the dump priority value
	var priorityElement = document.getElementById("priority");
	if (priorityElement.value < 0 || priorityElement.value > 999) {
		resultIsGreen = false;
		setErrorStyle(priorityElement);
		errorsHtml += "ERROR: Invalid dump priority value: must be > 0 and < 999<br>";		
	} else {
		unsetErrorStyle(priorityElement);
	}

	// Check whether any incompatible events/agents are selected
	// (nearly all incompatible scenarios are prevented by enabling/disabling input fields)
	if (heapIncompatibleEventChecked()) {
		if (!document.getElementById("agent_heap").disabled && document.getElementById("agent_heap").checked) {
			warningsHtml += "WARNING: The PHD heap dump agent cannot be triggered by GPF, abort, or internal JVM error events<br>";
		}
		if (!document.getElementById("request_prepwalk").disabled && document.getElementById("request_prepwalk").checked) {
			warningsHtml += "WARNING: Dump agents triggered by a GPF, abort, or internal JVM error cannot ensure the heap is walkable prior to dumping<br>";
		}
		if (!document.getElementById("request_compact").disabled && document.getElementById("request_compact").checked) {
			warningsHtml += "WARNING: Dump agents triggered by a GPF, abort, or internal JVM error cannot conduct a global GC prior to dumping<br>";
		}
		if (!document.getElementById("request_exclusive").disabled && document.getElementById("request_exclusive").checked) {
			warningsHtml += "WARNING: Dump agents triggered by a GPF, abort, or internal JVM error may have problems obtaining exclusive JVM access<br>";
		}		
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

// Return true if a string contains characters that are reserved on some platforms
// Otherwise return false
function containsReservedChars(string) {
	if (   string.indexOf("\\") != -1
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
	inputElement.style.borderColor = "red";
	inputElement.style.borderStyle = "solid";
}

function unsetErrorStyle(inputElement) {
	inputElement.style.borderColor = "";
	inputElement.style.borderStyle = "";

	inputElement.style.borderColor = null;
	inputElement.style.borderStyle = null;
}

function escapeHTML(text) {
	return text.replace(/&/g, "&amp;")
	           .replace(/</g, "&lt;")
	           .replace(/>/g, "&gt;")
	           .replace(/"/g, "&quot;")
	           .replace(/'/g, "&#039;");
}

// If a string ends with a '&' remove it
function removeFinalAmpersandIfPresent(string) {
	if (string.length > 0 && string.lastIndexOf("&") == string.length - 1) {
		return string.slice(0, -1);
	} else {
		return string;
	}
}

// Register this text element as the target for the dsn/file token buttons
function registerTokenTarget(textFieldElement) {
	fileDsnTokenTargetElement = textFieldElement;
}

// Register when a mousedown event has occurred on a tool/exec element
function registerToolExecMouseDown() {
	toolExecMouseDown = true;
}

// Register when a mousedown event has finished
function clearToolExecMouseDown() {
	toolExecMouseDown = false;
}

// Inserts text in a target text input, replacing the current selected text
// Target field must be enabled
function insertText(targetElement, textToInsert) {
	if (targetElement.disabled) {
		return;
	}
	
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
	// Serialize the form input fields
	// Note that this code, and the corresponding deserialization code in
	// parseParams(), relies on the order of the inputs in the document to
	// work correctly.
	// Elements that can be enabled/disabled automatically must come *after*
	// the elements which control that behaviour. If not, the default values
	// will override the serialized values.
	var serializedForm = "";
	var inputs = document.getElementById("XdumpForm").getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		var inputElement = inputs[i];
		if (inputElement.type == "checkbox") {
			if (inputElement.checked) {
				serializedForm += inputElement.id + "=1&";
			} else if (
				inputElement.id == "event_systhrow" ||
				inputElement.id == "wrap_in_quotes" ||
				inputElement.id.lastIndexOf("request_") == 0
			) {
				// These specific checkboxes are either checked by default, or can be
				// checked automatically if certain other options are checked, so if
				// they're unchecked we need to make note.
				serializedForm += inputElement.id + "=0&";
			}			
		}
		if (inputElement.type == "text" && inputElement.value != "") {
			serializedForm += inputElement.id + "=" + encodeURIComponent(inputElement.value) + "&";		    
		}
		if (inputElement.type == "number") {
			serializedForm += inputElement.id + "=" + inputElement.value + "&";		    
		}	
	}	
	serializedForm = removeFinalAmpersandIfPresent(serializedForm);

	// Get the base URL
	var urlString = window.location.protocol + '//' + window.location.host + window.location.pathname;

	// Append the serialized form
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
	processChange();
	return false;
}
