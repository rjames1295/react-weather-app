/**
 * General purpose component for recursively displaying JSON data where keys and values are dynamic
 */

import React, { useState } from "react"
import { camelCaseToNormalCase } from "../../utils/_helpers"

const ExpandableProperty = props => {
    const [isOpen, setIsOpen] = useState(!!props.expanded)

    return (
        <>
            <span
                style={{
                    cursor: "pointer",
                    textStyle: "underline",
                    color: "blue"
                }}
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
            >
                {props.title}
                {isOpen ? <span> v</span> : <span> ></span>}
            </span>

            {isOpen ? props.children : null}
            {props.children.length === 0 && isOpen ? <i>Empty</i> : null}
        </>
    )
}

const RecursiveData = props => {
    return (
            <div className="text-left p-l-15">
                {props.property !== null ? (
                    <>
                        {typeof props.property === "number" ||
                        typeof props.property === "string" ||
                        typeof props.property === "boolean" ? (
                            <>
                                {" "}
                                <b>{camelCaseToNormalCase(props.propertyName)}</b> : {String(props.property)}{" "}
                            </>
                        ) : (
                            <>
                                <ExpandableProperty
                                    title={camelCaseToNormalCase(props.propertyName)}
                                    expanded={props.rootProperty}
                                >
                                    {Object.values(props.property).map((property, index, { length }) => {
                                        return (
                                            <RecursiveData
                                                key={index}
                                                property={property}
                                                propertyName={Object.getOwnPropertyNames(props.property)[index]}
                                                excludeBottomBorder={index === length - 1}
                                            />
                                        )
                                    })}
                                </ExpandableProperty>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {" "}
                        <b>{camelCaseToNormalCase(props.propertyName)}</b> : {String(props.property)}{" "}
                    </>
                )}
            </div>
        )
}

export default RecursiveData
