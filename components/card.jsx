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
            <button className="download buttonNormal" onClick={() => open(this.props.url)}>
                <div>Download</div>
            </button>
            <button className="source buttonNormal" onClick={() => open(this.props.source)}>
                <div>Source Code</div>
            </button>
        </div>;
    }
}