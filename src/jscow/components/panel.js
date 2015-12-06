/**
  * jsCow panel component is a reusable component used in client side jsCow applications. 
  * A panel is a component, which enables users to collect any components in a collapsable group component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  	@class jsCow.res.components.panel
  * @type Class Provides the main class of the component
  * @constructor 
*/

/**
  * Will be triggert when toggle the state (collapsed | open) of the panel.
  * @event toggle
  */
/**
  * Will be triggert when the state of the panel is set to collapse.
  * @event collapse
  */
/**
  * Will be triggert when the state of the panel is set to open.
  * @event open
  */

jsCow.res.components.panel = function() { };
jsCow.res.components.panel.prototype = {

	/**
	  * The init method will be called by initializing the component. 
	  * The model, view and controller should be set within this method.
		
		this.addController(jsCow.res.controller.button);
		this.addModel(jsCow.res.model.button);
		this.addView(jsCow.res.view.button);
		
	  * @method init
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	init: function() {
		
		this.addController(jsCow.res.controller.panel);
		this.addModel(jsCow.res.model.panel);
		this.addView(jsCow.res.view.panel);
		
		return this;
	},
	

	/**
	  * This method is a user interaction method to set the title of the panel.
	  	
	  	// New panel instance with a default title
	  	var panel1 = jsCow.get(jsCow.res.components.panel, { 
			title: 'Panel 1 - Title'
		});
		
	  	// Set panel title by method
	  	btn.title('My new panel title');
		
	  * @method title
	  * @param {String} text Title of the panel.
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	
	title: function(title) {
		
		if (typeof title !== 'undefined' && typeof title === 'string') {
			this.trigger('title', {
				title: title
			});
		}
		
		return this;
	},
	
	
	/**
	  * This method is a user interaction method to set the state of the panel.
	  	
	  	// New panel instance with a default state collapsed
	  	var panel1 = jsCow.get(jsCow.res.components.panel, { 
			title: 'CollapsedPanel',
			collapse: true
		});
		
	  	// Set panel state to collapsed
	  	panel1.collapse();
		
	  * @method collapse
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	
	collapse: function() {
		
		this.trigger('collapse');
		
		return this;
	},
	
	
	/**
	  * This method is a user interaction method to set the state of the panel.
	  * The state open is the default state of the panel.
	  	
	  	// New panel instance with a default state open
	  	var panel1 = jsCow.get(jsCow.res.components.panel, { 
			title: 'CollapsedPanel',
			open: true
		});
		
	  	// Set panel state to open
	  	panel1.open();
		
	  * @method open
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	
	open: function() {
		
		this.trigger('open');
		
		return this;
	},
	
	
	/**
	  * This method is a user interaction method to toggle the state of the panel.
	  * The toggle method will switch the state between open and callapsed. 
	  	
	  	// Toggle th panel state
	  	panel.toggle();
		
	  * @method toggle
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	
	toggle: function() {
		
		this.trigger('toggle');
		
		return this;
	}
	
};


/**
  * Represents the model class of the jsCow panel component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.model.panel
  * @type Class Provides the model class of the component
  * @constructor 
  */

jsCow.res.model.panel = function() {
	
	/**
	  * JSON object with all model data.
	  * Default model data are:
		
		{
			enabled: true,
			visible: true,
			title: "",
			collapsed: false
		}

	  * 
	  * @property data
	  * @type Object
	  */
	
	this.data = {
		enabled: true,
		visible: true,
		title: "",
		collapsed: false
	};
	
};
jsCow.res.model.panel.prototype = {

	/**
	  * The model init method will only trigger the internal component event 'model.ready'.
	  * The event data are the model data.
	  * Default listener for this event is registered in the controller of the component. 
	  	
	  	this.trigger("model.ready", this.data);

	  * @method init
	  * @private
	  */
	
	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};


/**
  * Represents the view class of the jsCow button component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.view.panel
  * @type Class Provides the view class of the component
  * @constructor 
  */

jsCow.res.view.panel = function() {
	
	/**
	  * Objekt for all needed HTML-DOM elements of the component.
	  * 
	  * @property dom
	  * @type Object
	  * @default {} Object
	**/
	this.dom = {};
	
	/**
	  * Represents the html main container of the component.
	  * 
	  * @property dom.main
	  * @type Object
	  * @default <div/> jQuery DIV object
	**/
	this.dom.main = $('<div/>').addClass('jsc-panel clearfix');
	
	/**
	  * Represents the inner html container of the component.
	  * The button component do not need and not use this property. Therefore its commented out.
	  * 
	  * @property dom.content
	  * @type Object
	  * @default <div/> jQuery DIV object
	**/
	this.dom.content = $('<div/>').addClass('jsc-panel-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.panel.prototype = {
	
	/**
	  * The view init method can used to set default view properties.
	  * By trigger the event 'model.ready' the controller will trigger the event 'view.init' to call this method.
	  * This method register the jquery click event on the panel title element, set the title text and update the view.
	  * @method init Set the jquery click event on the panel title element and trigger the component event 'view.update'.
	  */
	
	init: function(e) {
		
		// Title with arrow
		this.dom.titlebar = $('<div/>').addClass('jsc-panel-titlebar').click((function(self, e) {
			return function() {
				if (e.data.enabled) {
					self.trigger("toggle");
				}
			};
		})(this, e));
		
		this.dom.arrow = $('<i/>').addClass('fa fa-arrow-left').appendTo( this.dom.titlebar );
		this.dom.title = $('<span/>').appendTo( this.dom.titlebar );
		this.dom.main.prepend( this.dom.titlebar );
		
		this.trigger("view.update", e.data);
	},
	
	
	/**
	  * The view update method will update the complete component view by trigger the event 'view.update' with all available model data.
	  	
	  	this.trigger(
	  		"view.update", 
	  		this.cmp().config()
	  	);

	  * @method update
	  * @param {object} eventdata Contains all sent event data
	  */

	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main.removeClass('jsc-panel-disabled').addClass('jsc-panel');
			
			this.dom.title.html(e.data.title);
			
			if (e.data.collapsed) {
				this.dom.content.hide();
				this.dom.arrow.removeClass('fa-arrow-down').addClass('fa-arrow-left');
			}else{
				this.dom.content.show();
				this.dom.arrow.removeClass('fa-arrow-left').addClass('fa-arrow-down');
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
		}else{
			
			this.dom.main.removeClass('jsc-panel').addClass('jsc-panel-disabled');
			
		}
	}
	
};


/**
  * Represents the controller class of the jsCow button component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.controller.panel
  * @type Class Provides the controller class of the component
  * @constructor 
  */

jsCow.res.controller.panel = function() {};
jsCow.res.controller.panel.prototype = {
	
	/**
	  * The controller init method register all needed events within the controller and provides all related event handler.

	  	// Code examples
	  	this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
		this.on("collapse", this.collapse);
		this.on("open", this.open);
		this.on("toggle", this.toggle);

	  * @method init
	  */

	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("title", this.title);
		this.on("collapse", this.collapse);
		this.on("open", this.open);
		this.on("toggle", this.toggle);
	},
	
	
	/**
	  * The controller isModelReady method is an event handler and will be triggert by the event 'model.ready' with all available model data.
	  * Is the model ready the 'view.init' event will triggert by this handler with all available model data again.
	  	
	  	this.trigger(
			"view.init", 
			this.cmp().config()
		);

	  * @method isModelReady
	  * @param {object} eventdata Contains all sent event data
	  */

	isModelReady: function() {
		this.trigger(
			"view.init", 
			this.cmp().config()
		);
	},
	
	
	/**
	  * The controller title method is an event handler and will only set the title for the panel.
	  * This handler will be triggert by the component specific event 'title'.
	  	
	  	this.cmp().config({
			title: e.data.title
		});

	  * @method title
	  * @param {object} eventdata Contains all sent event data
	  */
	
	title: function(e) {
		this.cmp().config({
			title: e.data.title
		});
	},
	
	
	/**
	  * The controller collapse method is an event handler and will only set the collapse for the panel.
	  * This handler will be triggert by the component specific event 'collapse'.
	  	
	  	this.cmp().config({
			collapsed: true
		});

	  * @method collapse
	  * @param {object} eventdata Contains all sent event data
	  */
	
	collapse: function(e) {
		this.cmp().config({
			collapsed: true
		});
	},
	
	
	/**
	  * The controller open method is an event handler and will only set the open for the panel.
	  * This handler will be triggert by the component specific event 'open'.
	  	
	  	this.cmp().config({
			collapsed: false
		});

	  * @method open
	  * @param {object} eventdata Contains all sent event data
	  */
	
	open: function(e) {
		this.cmp().config({
			collapsed: false
		});
	},
	
	
	/**
	  * The controller toggle method is an event handler and will only set the toggle for the panel.
	  * This handler will be triggert by the component specific event 'toggle'.
	  * @method toggle
	  * @param {object} eventdata Contains all sent event data
	  */
	
	toggle: function(e) {
		
		var config = this.cmp().config();
		
		if (config.collapsed === true) {
			this.cmp().config({
				collapsed: false
			});
		}else{
			this.cmp().config({
				collapsed: true
			});
		}
		
	}
	
};
