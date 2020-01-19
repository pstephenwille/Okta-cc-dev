import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withAuth} from '@okta/okta-react';

// const Detail = withAuth(({auth, show, props}) => {
//     console.log('..x ', show, props);
//     return (
//         <div>
//             <h1>hola </h1>
//         </div>
//     );
// });

let name:string;
const Detail = withAuth(class Detail extends Component {
    constructor(props) {
        super(props);
        console.log('..props ', props.location.state.name);
        name = props.location.state.name
    }

    render() {
        return (
            <div>
                <h1>My Detail x</h1>
                <p>{name}</p>
            </div>
        )
    }
});

const mapStateToProps = ({shows}) => {
    return ({
        show: shows.detail,
    })
};

export default connect(mapStateToProps)(Detail);
