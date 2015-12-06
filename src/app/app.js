$(function(){
	
	console.time('all');
	
	var panel1 = jsCow.get(jsCow.res.components.panel, { 
		title: 'Panel 1 - Title'
	});
	
	var panel2 = jsCow.get(jsCow.res.components.panel, { 
		title: 'Panel 2 - Title'
	});

	var panel3 = jsCow.get(jsCow.res.components.panel, { 
		title: 'Panel 3 - Title',
		collapse: true
	});

	var panel4 = jsCow.get(jsCow.res.components.panel, { 
		title: 'Panel 4 - Title'
	});

	panel1
		.add(panel2)
		.run();
	panel3
		.add(panel4)
		.run();

	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});
