import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "React";
import * as ReactDOM from "react-dom";
import { jsPDF } from 'jspdf';
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;


export class pcf implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _value: number;
	private _notifyOutputChanged: () => void;
	// private labelElement: HTMLLabelElement;
	// private inputElement: HTMLInputElement;
	private container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _refreshData: EventListenerOrEventListenerObject;
	private _edtorplaceholder: HTMLDivElement;
	//private editor : editorJS;


	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		this._context = context;
		this.container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);
		//this._value = context.parameters.controlValue.raw!;


		const gridHTML = `
<div id="dashboard">
 <button id="save-button">Download</button>
 `
		let ele = document.createElement("div");
		this.container = document.createElement("div");
		this.container.id = 'GridContainer';
		this.container.innerHTML = gridHTML;

		//ReactDOM.render(React.createElement(new editorJS(), null), this.container);



		container.appendChild(this.container);
	}

	public refreshData(evt: Event): void {
		//	this._value = (this.inputElement.value as any) as number;
		//	this.labelElement.innerHTML = this.inputElement.value;
		this._notifyOutputChanged();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// storing the latest context from the control.
		//this._value = context.parameters.controlValue.raw!;
		this._context = context;
		var params = context.parameters;


		if (params.fileName.raw?.startsWith('yes')) {
			params.fileName.raw = 'no'


			const doc = new jsPDF("l", "mm", "a1");
			var width = doc.internal.pageSize.getWidth();
			var height = doc.internal.pageSize.getHeight();
			
			doc.setFontSize(40);

			//doc.text(35, 25, "Octonyan loves jsPDF");
			//let i=0
			for (let i = 0; i <= 4; i++) {
				//Image url Cahching issue
				let htmlToPDF = "https://picsum.photos/1200/80"+i.toString();
				//if(i % 2 == 0)

				//console.log("Iterating eachpage to render");
				let ele = document.createElement("div");
				ele.id = "image_ren_"+i.toString();
				ele.innerHTML = `
<html>
<style>
table, th, td {
  border:1px solid black;
}
</style>
<body>
<h1>Table Heading`+" - "+i.toString()+`</h1><br><p>Analysis by Country</p>
<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
<br>
<img src=`+htmlToPDF+` >
</body>
</html>
 `;
				ele.style.overflow = 'visible'
				document.getElementsByTagName('BODY')[0].append(ele);
				//window.scrollTo(0,0);
				try {
					html2canvas(document.getElementById(ele.id), {
						logging: true,
						profile: true,
						width: width,
						height: height,
						scale: 5,
						useCORS: true
					}).then(function (canvas) {
						console.log("inside html2canvas callback");
						const imgData = canvas.toDataURL('image/png');
						doc.addImage(imgData, 'JPEG', 0, 0, width , height);
						doc.addPage();
						document.getElementById(ele.id)?.remove();
						// doc.addImage(htmlToPDF, 'JPEG', 0, 0, width * 0.5, height * 0.5);
						// doc.addPage();
						if (i == 4) {
							setTimeout(() => {
								console.log('hello');
								doc.save("dash.pdf");
								//document.getElementsByTagName('')
							}, 0);

						}
					});

				} catch (error) {
					console.error(error);
				}

			}


		}
	}


	public getOutputs(): IOutputs {
		return {
			//controlValue: this._value
		};
	}

	public destroy(): void {
		//	this.inputElement.removeEventListener("input", this._refreshData);
	}

	public delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}