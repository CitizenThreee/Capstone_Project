import { Dropdown, Form, FormLabel } from "react-bootstrap";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import ContentFormSwitch from "../elements/ContentFormSwitch";
import ContentFormDropdown from "../elements/ContentFormDropdown";

// A form container for content elements within the create tab form
export default function ContentFormElement({ i, input, onSetInput, defaultContent }) {
    const { currentGroup } = useCurrentGroupContext();

    // When an input is changed, set the input state passed from the parent form
    const onChangeInput = (name, value) => {
        onSetInput({
            ...input,
            contentSchema: input.contentSchema.map((obj, index) => 
                index == i ? {...obj, [name]: value} : obj)
        })
    }

    // When the isContainer switch is changed, either remove the child schemas, or create a new one then update the input
    const onChangeIsContainer = (name, value) => {
        let newSchema = [...input.contentSchema];

        if(value){
            newSchema = [...newSchema, {...defaultContent}];
        }
        else{
            newSchema = newSchema.filter((obj, index) => index < i+1);
        }

        onSetInput({
            ...input,
            contentSchema: newSchema.map((obj, index) => 
                index == i ? {...obj, [name]: value} : obj) 
        })
    }

    // Toggle a dropdown item and set the input to reflec the change
    const onToggleDropdown = (e, name, option) => {
        e.stopPropagation();

        if(input.contentSchema[i][name].includes(option)){
            onChangeInput(name, input.contentSchema[i][name].filter(role => role != option))
        }
        else { onChangeInput(name, [...input.contentSchema[i][name], option]); }
    }

    //If the parent container type is "Page", the child content can't be specified, so just return a placeholder box with some info
    if(i > 0 && input.contentSchema[i - 1].cType == ("page")) return (
        <div className="mb-3 p-2 d-flex justify-content-center" style={{ backgroundColor: "#eee" }}>
            <p>Page elements can't have custom content types</p>
        </div>)

    //Otherwise return a dynamic form based on the user selections
    return (
        <Form.Group className="mb-3 p-2" style={{ backgroundColor: "#eee" }}>

            {/* Set the content type */}
            <ContentFormDropdown title="Type" value={input.contentSchema[i].type}>
                <Dropdown.Item active={input.contentSchema[i].type == "post"} onClick={() => onChangeInput("type", "post")}>Post</Dropdown.Item>
                <Dropdown.Item active={input.contentSchema[i].type == "alert"} onClick={() => onChangeInput("type", "alert")}>Alert</Dropdown.Item>
            </ContentFormDropdown>

            {/* Toggle the content container status */}
            <ContentFormSwitch name="isContainer" title="Is Container" onChange={onChangeIsContainer} value={input.contentSchema[i].isContainer}/>
            
            {/* Additional permission options rendered if the content is a container */}
            {input.contentSchema[i].isContainer && 
                <>
                    <ContentFormDropdown title="Container Type" value={input.contentSchema[i].cType}>
                        <Dropdown.Item active={input.contentSchema[i].cType == "page"} onClick={() => onChangeInput("cType", "page")}>Page</Dropdown.Item>
                        <Dropdown.Item active={input.contentSchema[i].cType == "feed"} onClick={() => onChangeInput("cType", "feed")}>Feed</Dropdown.Item>
                    </ContentFormDropdown>

                    <ContentFormDropdown title="View" value={input.contentSchema[i].view.length ? input.contentSchema[i].view.map(item => item + " | ") : "all"}>
                        {currentGroup.roles.map((option, index) => (
                            <Dropdown.Item key={index} active={input.contentSchema[i].view.includes(option)} onClick={(e) => onToggleDropdown(e, "view", option)}>
                                {option}
                            </Dropdown.Item>
                        ))}
                    </ContentFormDropdown>

                    <ContentFormDropdown title="Post Freely" value={input.contentSchema[i].fpost.length ? input.contentSchema[i].fpost.map(item => item + " | ") : "all"}>
                        {currentGroup.roles.map((option, index) => (
                            <Dropdown.Item disabled={input.contentSchema[i].rpost.includes(option)} 
                            active={input.contentSchema[i].fpost.includes(option)} key={index} onClick={(e) => onToggleDropdown(e, "fpost", option)}>
                                {option}
                            </Dropdown.Item>
                        ))}
                    </ContentFormDropdown>

                    <ContentFormDropdown title="Request To Post" value={input.contentSchema[i].rpost.length ? input.contentSchema[i].rpost.map(item => item + " | ") : "none"}>
                        {currentGroup.roles.map((option, index) => (
                            <Dropdown.Item disabled={input.contentSchema[i].fpost.includes(option)} 
                            active={input.contentSchema[i].rpost.includes(option)} key={index} onClick={(e) => onToggleDropdown(e, "rpost", option)}>
                                {option}
                            </Dropdown.Item>
                        ))}
                    </ContentFormDropdown>
                </>
            }

            {/* Content inputs available based off the type of content */}
            {["post"].includes(input.contentSchema[i].type) && 
            <ContentFormSwitch name="img" title="Image" onChange={onChangeInput} value={input.contentSchema[i].img}/>}

            {["post" ].includes(input.contentSchema[i].type) && 
            <ContentFormSwitch name="subtitle" title="Subtitle" onChange={onChangeInput} value={input.contentSchema[i].subtitle}/>}

            {["alert", "post" ].includes(input.contentSchema[i].type) && 
            <ContentFormSwitch name="description" title="Description" onChange={onChangeInput} value={input.contentSchema[i].description}/>}
        </Form.Group>
        
    )
} 