import { useState } from 'react';

export const CollapseSection = () => {
    const [collapsedSections, setCollapsedSections] = useState({})

    // changes whether a section of the list is collapsed or not
    const toggleCollapse = (key) => {
        setCollapsedSections(prevState => ({
            // keep collapsed boolean values for other sections
            ...prevState,

            // changes collapsed value for particular section
            [key]: !prevState[key]
        }));
    };

    return {
        collapsedSections,
        setCollapsedSections,
        toggleCollapse
    }
}