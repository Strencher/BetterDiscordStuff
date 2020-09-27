module.exports = class Card extends React.Component {
    state = {};
    render() {
        return <div className={['card', this.props.type].join(' ')}>
            <div className="head">
                <div className="name">{this.props.name}</div>
                <div className="version"> v{this.props.version}</div>
            </div>
            <img src={this.props.img} className="preview" onClick={this.props.onView}/>
            <div className="description">{this.props.description}</div>
            <a href={this.props.url} className="download buttonNormal">Download</a>
            <a href={this.props.source} className="source buttonNormal">Source Code</a>
        </div>;
    }
}