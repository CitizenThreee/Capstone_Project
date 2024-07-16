import { useEffect, useState } from "react";
import { Button, ButtonGroup, CloseButton, Dropdown, Form, FormGroup, FormLabel } from "react-bootstrap";
import ContentFormElement from "./ContentFormElement";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import ContentFormDropdown from "../elements/ContentFormDropdown";

const defaultContent = {
    type: "page",
    view: [],
    fpost: [],
    rpost: [],
    isContainer: false,
    cType: "page",
    image: false,
    subTitle: false,
    description: false
}

export default function CreateTabForm({ onCreate, onCancel }) {
    const { currentGroup } = useCurrentGroupContext();
    const [ input, setInput ] = useState({
        groupId: currentGroup._id,
        name: "",
        type: "page",
        view: [],
        fpost: [],
        rpost: [],
        contentSchema: [{...defaultContent}],
        position: currentGroup.tabs.length > 1 ? currentGroup.tabs[currentGroup.tabs.length-1].position + 1 : 0
    });

    const onSetInput = (input) => {
        setInput(input);
    }

    const onChangeInput = (name, value) => {
        setInput({
            ...input,
            [name]: value
        })
    }

    const onToggleDropdown = (e, name, option) => {
        e.stopPropagation();

        if(input[name].includes(option)){
            onChangeInput(name, input[name].filter(role => role != option))
        }
        else { onChangeInput(name, [...input[name], option]); }
    }

    return(
        <>
            <Form className="d-flex flex-column p-2 w-100">
                <Form.Group className="w-100 mb-3">
                    <Form.Control value={input.name} onChange={(e) => onChangeInput("name", e.target.value)} type="text" placeholder="tab name" size="lg"/>
                </Form.Group>

                <ContentFormDropdown title={"Type"} value={input.type}>
                    <Dropdown.Item active={input.type == "page"} onClick={() => onChangeInput("type", "page")}> Page </Dropdown.Item>
                    <Dropdown.Item active={input.type == "feed"} onClick={() => onChangeInput("type", "feed")}> Feed </Dropdown.Item>
                    <Dropdown.Item active={input.type == "chat"} onClick={() => onChangeInput("type", "chat")}> Chat </Dropdown.Item>
                </ContentFormDropdown>
                
                <FormLabel className="mx-auto fs-3 fw-semibold mb-3">Permissions</FormLabel>
                <ContentFormDropdown title={"View"} value={input.view.length ? input.view.map(item => item + " | ") : "all"}>
                    {currentGroup.roles.map((option, i) => (
                        <Dropdown.Item key={i} onClick={(e) => onToggleDropdown(e, "view", option)} active={input.view.includes(option)} >
                            {option}
                        </Dropdown.Item>
                    ))}
                </ContentFormDropdown>

                {input.type != 'chat' && <ContentFormDropdown title={"Post Freely"} value={input.fpost.length ? input.fpost.map(item => item + " | ") : "all"}>
                    {currentGroup.roles.map((option, i) => (
                        <Dropdown.Item disabled={input.rpost.includes(option)} key={i} onClick={(e) => onToggleDropdown(e, "fpost", option)} active={input.fpost.includes(option)}>
                            {option}
                        </Dropdown.Item>
                    ))}
                </ContentFormDropdown>}
                
                {input.type == 'feed' && <ContentFormDropdown title={"Request To Post"} value={input.rpost.length ? input.rpost.map(item => item + " | ") : "none"}>
                    {currentGroup.roles.map((option, i) => (
                        <Dropdown.Item disabled={input.fpost.includes(option)} key={i} onClick={(e) => onToggleDropdown(e, "rpost", option)} active={input.rpost.includes(option)}>
                            {option}
                        </Dropdown.Item>
                    ))}
                </ContentFormDropdown>}

                {input.type == "feed" && <div className="d-flex flex-column mb-3">
                    <FormLabel className="mx-auto fs-3 fw-semibold">Content</FormLabel>
                    {input.contentSchema.map((item, i) => (
                        <ContentFormElement key={i} i={i} input={input} onSetInput={onSetInput} defaultContent={defaultContent}/>
                    ))}
                </div>}
                
                <ButtonGroup className="w-100">
                    <Button variant="outline-danger" onClick={onCancel}>cancel</Button>
                    <Button variant="outline-success" onClick={() => {onCreate({...input})}}>create</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}