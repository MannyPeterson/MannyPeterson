const React = require("react");
const color = require("./color");
const styled = require("./styled");
module.exports = Window;

function Window(props) {
    const titleBarHeight = 32;
    const borderWidth = 6;
    const paddingTop = props.decorations ? props.paddingY + titleBarHeight + borderWidth + 10 : props.paddingY;
    const paddingBottom = props.decorations ? props.paddingY + borderWidth + 10 : props.paddingY;
    const paddingX = props.decorations ? props.paddingX + borderWidth + 10 : props.paddingX;
    const width = props.width * 10 + paddingX * 2;
    const height = props.height * 10 + paddingTop + paddingBottom;

    // SGI IRIX colors (darker gray)
    const bgColor = "#9a9a9a";       // SGI gray
    const lightEdge = "#c8c8c8";     // Light bevel
    const darkEdge = "#5a5a5a";      // Dark bevel
    const darkerEdge = "#3a3a3a";    // Darker shadow

    return (React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        width: width,
        height: height
    },
        // Outer dark border (bottom-right shadow)
        React.createElement("rect", {
            x: 0, y: 0, width: width, height: height,
            fill: darkerEdge
        }),
        // Light border (top-left highlight)
        React.createElement("rect", {
            x: 0, y: 0, width: width - 2, height: height - 2,
            fill: lightEdge
        }),
        // Main gray background
        React.createElement("rect", {
            x: 2, y: 2, width: width - 4, height: height - 4,
            fill: bgColor
        }),
        // Inner dark edge
        React.createElement("rect", {
            x: 3, y: 3, width: width - 6, height: height - 6,
            fill: darkEdge
        }),
        // Terminal background
        React.createElement("rect", {
            x: 5, y: titleBarHeight + 5,
            width: width - 10,
            height: height - titleBarHeight - 10,
            fill: color(props.theme.background)
        }),
        // Title bar decorations
        props.decorations && React.createElement("g", null,
            // Title bar background
            React.createElement("rect", {
                x: 4, y: 4, width: width - 8, height: titleBarHeight - 2,
                fill: bgColor
            }),
            // Menu button (left) - outer light
            React.createElement("rect", { x: 8, y: 8, width: 20, height: 18, fill: lightEdge }),
            // Menu button - dark edge
            React.createElement("rect", { x: 9, y: 9, width: 19, height: 17, fill: darkEdge }),
            // Menu button - face
            React.createElement("rect", { x: 9, y: 9, width: 17, height: 15, fill: bgColor }),
            // Menu button - inner decoration
            React.createElement("rect", { x: 12, y: 13, width: 11, height: 2, fill: darkEdge }),
            React.createElement("rect", { x: 12, y: 18, width: 11, height: 2, fill: darkEdge }),

            // Title text
            React.createElement("text", {
                x: 34, y: 26,
                textAnchor: "start",
                fontSize: 20,
                fontFamily: "Helvetica, Arial, sans-serif",
                fontStyle: "italic",
                fill: "#000000"
            }, "winterm"),

            // Minimize button - outer light
            React.createElement("rect", { x: width - 54, y: 8, width: 20, height: 18, fill: lightEdge }),
            // Minimize button - dark edge
            React.createElement("rect", { x: width - 53, y: 9, width: 19, height: 17, fill: darkEdge }),
            // Minimize button - face
            React.createElement("rect", { x: width - 53, y: 9, width: 17, height: 15, fill: bgColor }),
            // Minimize icon
            React.createElement("rect", { x: width - 49, y: 19, width: 10, height: 3, fill: darkEdge }),

            // Maximize button - outer light
            React.createElement("rect", { x: width - 30, y: 8, width: 20, height: 18, fill: lightEdge }),
            // Maximize button - dark edge
            React.createElement("rect", { x: width - 29, y: 9, width: 19, height: 17, fill: darkEdge }),
            // Maximize button - face
            React.createElement("rect", { x: width - 29, y: 9, width: 17, height: 15, fill: bgColor }),
            // Maximize icon
            React.createElement("rect", { x: width - 26, y: 12, width: 10, height: 8, fill: "none", stroke: darkEdge, strokeWidth: 2 })
        ),
        props.children
    ));
}

const StyledBackground = styled.rect `
  fill: ${props => color(props.theme.background)};
`;
const StyledDot = styled.circle `
  fill: ${props => props.bgColor};
`;
