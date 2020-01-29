/**
 * General purpose component for recursively displaying JSON data where keys and values are dynamic
 */

import React from "react"
import { camelCaseToNormalCase } from "../../utils/_helpers"

class ExpandableProperty extends React.Component {
    state = {
        open: !!this.props.expanded
    }

    render() {
        return (
            <>
                <span
                    style={{
                        cursor: "pointer",
                        textStyle: "underline",
                        color: "blue"
                    }}
                    onClick={() => {
                        this.setState({ open: !this.state.open })
                    }}
                >
                    {this.props.title}
                    {this.state.open ? <span> v</span> : <span> ></span>}
                </span>

                {this.state.open ? this.props.children : null}
                {this.props.children.length === 0 && this.state.open ? <i>Empty</i> : null}
            </>
        )
    }
}

class RecursiveData extends React.Component {
    render() {
        return (
            <div className="text-left p-l-15">
                {this.props.property !== null ? (
                    <>
                        {typeof this.props.property === "number" ||
                        typeof this.props.property === "string" ||
                        typeof this.props.property === "boolean" ? (
                            <>
                                {" "}
                                <b>{camelCaseToNormalCase(this.props.propertyName)}</b> : {String(this.props.property)}{" "}
                            </>
                        ) : (
                            <>
                                <ExpandableProperty
                                    title={camelCaseToNormalCase(this.props.propertyName)}
                                    expanded={this.props.rootProperty}
                                >
                                    {Object.values(this.props.property).map((property, index, { length }) => {
                                        return (
                                            <RecursiveData
                                                key={index}
                                                property={property}
                                                propertyName={Object.getOwnPropertyNames(this.props.property)[index]}
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
                        <b>{camelCaseToNormalCase(this.props.propertyName)}</b> : {String(this.props.property)}{" "}
                    </>
                )}
            </div>
        )
    }
}

export default RecursiveData
