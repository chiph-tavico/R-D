import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import $ from 'jquery';
import axios from 'axios';

function DiagramBpmn() {
  const [diagram, diagramSet] = useState("");
  const container = document.getElementById("container");

  useEffect(() => {
      axios
        .get(
          "https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/resources/pizza-collaboration.bpmn"
        )
        .then((r) => {
          diagramSet(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);

  useEffect(() => {
    if (!!diagram) {
      const renderCanvas = async () => {
        const modeler = new Modeler({
          container,
          keyboard: {
            bindTo: document
          }
        });
    
        try {
          await modeler.importXML(diagram);
          const elementRegistry = modeler.get("elementRegistry");
          const graphicsFactory = modeler.get("graphicsFactory");

          function setColor(element, stroke, fill) {
            // var businessObject = element.businessObject;
  
            element.di.set("stroke", stroke);
            element.di.set("fill", fill);
  
            var gfx = elementRegistry.getGraphics(element);
  
            var type = element.waypoints ? "connection" : "shape";
  
            graphicsFactory.update(type, element, gfx);
          }
  
          const element = elementRegistry.get("CalmCustomerTask");
  
          setColor(element, "green", "yellow");
          const eventBus = modeler.get("eventBus");

          eventBus.on("element.click", (event) => {
            // entry bpmn-icon-trash
            const el = $('.djs-overlays');
            el.find('.bpmn-icon-connection-multi')[0].setAttribute('class', 'hidden');
            el.find('.bpmn-icon-screw-wrench')[0].setAttribute('class', 'hidden');
            el.find('.bpmn-icon-text-annotation')[0].setAttribute('class', 'hidden');
            el.find('.bpmn-icon-trash')[0].setAttribute('class', 'hidden');

            console.log('event', event.element.id);
            // el = {
            //   id: event.element.id,
            //   type: event.element.type
            // }
            // this.ngrxStore.dispatch(el);
          });

          // $('.djs-group').on('click', function() {
            // toolCustom();
            
    
          // })
        } catch (err) {
          console.log("error", err);
        }
      }
      renderCanvas();
    }
    
  }, [container, diagram]);

  const toolCustom = () => {
    const powered = $('.bjs-powered-by');
    powered && powered.addClass("hidden")

    const expanded = $('.bpmn-icon-subprocess-expanded');
    expanded && expanded.addClass("hidden")

    const lasso = $('.bpmn-icon-lasso-tool');
    lasso && lasso.addClass("hidden")

    const connection = $('.bpmn-icon-connection-multi');
    connection && connection.addClass("hidden")

    const dataObject = $('.bpmn-icon-data-object');
    dataObject && dataObject.addClass("hidden");
    
  }

  useEffect(() => {
    
    console.log('--useEffect');
    toolCustom();
    //bpmn-icon-connection-multi
    
    // dataObject && dataObject.addClass("hidden")
  });
  
  return (
    <>
      <div
        id="container"
        style={{
          border: "1px solid #000000",
          height: "90vh",
          width: "90vw",
          margin: "auto"
        }}
      ></div>
    </>
  );
}
export default DiagramBpmn;