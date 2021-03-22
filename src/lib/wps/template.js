
export const xmlRequestTemplate = ({ identifier, functionId, data, type, coastId }) => `

<wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" service="WPS" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
   <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">${identifier}</ows:Identifier>
   <wps:DataInputs>  
       <wps:Input>
         <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">${functionId}</ows:Identifier>
         <ows:Title xmlns:ows="http://www.opengis.net/ows/1.1">${functionId}</ows:Title>
         <wps:Data>
            <wps:LiteralData>
                    { 
                        "type": "Feature", 
                        "properties": {${coastId ? coastlineInput(coastId): ""}}, 
                        "geometry":{ 
                            "type": "${type}",
                            "coordinates": ${data}
                           } 
                        }   
		    </wps:LiteralData>
         </wps:Data>
      </wps:Input>
   </wps:DataInputs>
   <wps:ResponseForm>
      <wps:RawDataOutput mimeType="application/json">
         <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">output_json</ows:Identifier>
      </wps:RawDataOutput>
   </wps:ResponseForm>
</wps:Execute>`;

function coastlineInput(coastId) {
   return `"coastline_id": ${coastId}`
}