define( [ "qlik","jquery", "css!./bootstrap/bootstrap.css",  "css!./style.css"],
function ( qlik, $) {


	return {
			
		definition: {
			type: "items",
			component: "accordion",
			items: {
				
				
				settings: {
					uses: "settings",
					items: {
			        // Definition of the custom section header
			        kpiSettings: {
			            type: "items",
			            label: "Settings",
			            items: {
			            	
			                buttonlabel:{
								type:"string",
								label:"Button Label",
								ref:"prop.buttonlabel",
								defaultValue:"Export LoadScript",
								expression:"optional"
							},
							ButtonStyleProp: {
											type: "string",
											component: "dropdown",
											label: "Button Style",
											ref: "prop.buttonstyle",
											options: [{
												value: "primary",
												label: "Primary"
											},
											 {
												value: "success",
												label: "Success"
											},
											{
												value: "info",
												label: "Info"
											},
											{
												value: "warning",
												label: "Warning"
											},
											{
												value: "danger",
												label: "Danger"
											}],
											defaultValue: "success"
										},
							ButtonWidth: {
								type: "string",
								component: "buttongroup",
								label: "Button Width",
								ref: "prop.buttonwidth",
								options: [{
									value: "btn-block",
									label: "Full Width",
									tooltip: "Select for Full Width"
								}, {
									value: "",
									label: "Auto Width",
									tooltip: "Select for Auto Width"
								}],
								defaultValue: "btn-block"
							}
							

			            }
			        }
			    }


				}
					
			}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : true
		},
		paint: function ($element,layout) {
			//add your rendering code here
			$element.html( `<div class="bootstrap_inside"><button class="font-weight-bold  btn btn-`+layout.prop.buttonstyle+` `+layout.prop.buttonwidth+`" type="button" id = "test">`+layout.prop.buttonlabel+`</button></div>` );
			//needed for export
			
		 
			
	
			
			 $( "#test" ).click(function() {
			 
			 	var app = qlik.currApp(this);
			            
			  var LoadScriptName = 'qlikloadscript'
app.getAppLayout(function(layout){
	console.log(layout.qTitle);
LoadScriptName = layout.qTitle + " LoadScript";
});

			 		app.getScript().then( function(script){
							  console.log(script.qScript);
							  
							  const link = document.createElement("a");
         
         const file = new Blob([script.qScript], { type: 'text/plain' });
         link.href = URL.createObjectURL(file);
         link.download =  LoadScriptName + ".qvs";
         link.click();
         URL.revokeObjectURL(link.href);


							});
				
				
				
				
				
			 	
			 });  
			  

		
		
			return qlik.Promise.resolve();
		}
	};

} );




	