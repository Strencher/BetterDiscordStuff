module.exports = (async () => {
    const plugins = await require('./plugins.json');
    const themes = await require('./themes.json');
    const Card = await require('./components/card.jsx')
    class ImageViewer extends React.Component {
        state = {opened: false, image: null};

        render() {
            return <div className={["image-viewer", this.state.opened ? 'opened' : 'hidden'].join(' ')}>
                <div className="backdrop" onClick={() => this.clearImages()}/>
                <div className="content">
                    <div className="close" onClick={() => this.clearImages()}>X</div>
                    {this.state.image}
                </div>
            </div>
        }

        clearImages() {
            this.setState({image: null, opened: false});
        }

        openImage(image) {
            this.setState({image: <img src={image} onClick={() => open(image)}/>, opened: true})
        }
    }

    return class App extends React.Component {
        imageViewerRef = React.createRef();

        render() {
            return [
                <ImageViewer ref={this.imageViewerRef}/>,
                <div className="title">
                    <div className="text blue">BetterDiscord</div>
                    <div className="text"> Addons</div>
                    <a href="https://discord.gg/gvA2ree">Support Server, <span>{discordInfo.presence_count} Online</span></a>
                </div>,
                <div className="section plugins">Plugins: </div>,
                plugins.map((e, i) => <Card {...e} type="plugin" key={"plugin-"+i} onView={() => this.showImage(plugins, i)}></Card>),
                <div className="section themes">Themes: </div>,
                themes.map((e, i) => <Card {...e} type="theme" key={"theme-"+i} onView={() => this.showImage(themes, i)}></Card>),
            ]
        }

        showImage(store, index) {
            console.log(this.imageViewerRef)
            this.imageViewerRef.current.openImage(store[index].img);
        }
    }
})();