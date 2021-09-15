<h1 style="text-align:center">Creating a standalone view component</h1>

## Table Of Contents:
* [Introduction](#introduction)
* [View component architecture](#architecture)
  * [View component definition](#view-component-definition)
  * [File structure](#file-structure)
* [How to create a view component?](#create-view-component)
* [Star-rating code walk-through](#star-rating)
  * [Registration](./REGISTRATION.MD)
  * Design Time
    * [Design time (Model)](./DESIGN_TIME_MODEL.MD)
    * [Design time (Component)](./DESIGN_TIME_COMPONENT.MD)
  * [Runtime](./RUNTIME.MD)


<a name="introduction"></a>
## Introduction
> :memo:  
> The flow from this tutorial is coming from the [BMC Documentation](https://docs.bmc.com/docs/helixplatform/creating-custom-view-components-851871297.html).

The View designer consists of built-in view components (like record grid, record editor). You can create your own custom view components. A view component is a regular Angular component. To create a custom view component you can create an Angular component and register it to make it available in the View designer.  
A standalone view component is a component that can function on its own, not depending on a **record editor** component.  
If you wish to create a field view component which depends on a **record editor** please check this [tutorial](../_record-field-view-component/RECORD_FIELD_VIEW_COMPONENT.MD).  

For example, if you want end users to let their feedback in your application using a "star rating" component rather than using a number field you can create such a graphical view component.  

In this example we will detail the view component [star-rating](../../_details/JAVASCRIPT_VIEW_COMPONENTS.MD#star-rating).  
This view component leverages the Adapt **adapt-rx-rating** component that will allow us to speed up the development time as we will not need to code the component itself but embed it.

  
> :warning:  
> You must ensure that you follow naming conventions (namespacing) for all angular object names and all HTML filenames in shared code.  
> See [coding and naming guidelines](../CODING_NAMING_GUIDELINES.MD).



<a name="architecture"></a>
## View component architecture
<a name="view-component-definition"></a>
### View component definition
A standalone view component is placed in a View and usually:
* Allows input parameter(s),
  * For example the default number of stars, 
* Executes some code,
  * For example here we set the number of stars and react when the end user selects the number of stars,
* Returns output parameter(s),
  * For example the number of selected stars
 
![Runtime Component screenshot](../../_details/pictures/view-component-star-rating-runtime.png)

<a name="file-structure"></a>
### File structure
A view component has usually this file structure, separated in two folders:
* "root" level (registration):
  * registration.module: Contains its name and reference to the other necessary objects or services (name, definition, execution, validation),
    * The registration module is imported in the main library module,
* /design:
  * Files necessary for the design time in View designer,
    * Display in the palette and the canvas, how to display the Input Parameters, validation code,
    * Their code will be executed at **design time**, in View Designer, 
  * .module: Design time module referencing the design time component,
  * .design.model: Declares the view component Input and Output parameters as well as the Input Parameters validation,
  * .design.component (ts and html): Angular component that will be displayed in the View designer canvas,
  * .interface: Necessary interface, usually the Input Parameters,
* /runtime:
  * Files necessary for runtime operation,
    * Display in the runtime view, how to consume the Input Parameters, execute code and broadcast Output Parameters,
    * Their code will be executed at **runtime**, 
  * .module: runtime module referencing the runtime component,
  * .component (ts and html): Angular component that will be displayed at runtime, in the view,

> :memo:  
> In the star-rating example we use other files:
> .types: Contains some constants, 

![view component architecture](../../_details/pictures/view-component-architecture.png)


<a name="create-view-component"></a>
## How to create a view component?:
You can use our schematics to generate a skeleton code.  
> :memo:  
> A schematic is a templating system which will automatically create the necessary files, name them appropriately and automatically import the necessary modules in the main library.  
  
Go in the webapp folder and type:
```bash
yarn run ng g rx-view-component "<view-component-name>"
```
For example:
```bash
yarn run ng g rx-view-component "star-rating"
```

> :memo:  
> To do a "dry run", which means trying to create the view component without actually creating or updating the files, add "--dry-run" at the end of the command line, for example:
> ```bash
> yarn run ng g rx-view-component "star-rating" --dry-run
> ```

> :memo:  
> It is highly recommended leveraging this capability rather than creating the file structure manually.  


<a name="star-rating"></a>
## Star rating code walk-through
* Click [here](./REGISTRATION.MD) for the Registration chapter,
* Design Time:
  * Click [here](./DESIGN_TIME_MODEL.MD) for the Design Time chapter (Model),
  * Click [here](./DESIGN_TIME_COMPONENT.MD) for the Design Time chapter (Component),
* Click [here](./RUNTIME.MD) for the Runtime chapter,
