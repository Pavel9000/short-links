import React, {Component} from 'react'
import classes from './index.module.css'
import Layout from '../../layouts/Layout'
import Button from '../../components/UI/button'
import {connect} from 'react-redux'

class Home extends Component {

    state = {
        user_id: '',
        num_page: 0,
        count_on_page: 3,
        links: [],
        messageText: '',
        create_link_modal_text: '',
        subpart_already_exist: ''
    }

    async componentDidMount() {

        if (localStorage.id) {
            
            if (localStorage.links && localStorage.links !== '[]') { 
                this.setState({ links: JSON.parse(localStorage.links) }) 
            } else {

                const url = `${this.props.config.url.isDev ? (this.props.config.url.dev.url+this.props.config.url.dev.serverPort) : this.props.config.url.url }/api/links/${localStorage.id}`

                const response = await fetch(url)

                const json = await response.json()

                if ( json.user_links ) {
                    this.setState({ links: json.user_links })
                    localStorage.links = JSON.stringify(json.user_links)
                } else {
                    this.setState({ messageText: 'Ошибка' })
                    return
                }

            }

            if (localStorage.num_page) { this.setState({ num_page: Number(localStorage.num_page) }) }
            if (localStorage.id) { this.setState({user_id: localStorage.id}) }
            
            document.querySelector('#long_link').focus()   
        } else {
            document.querySelector('#user_id').focus()    
        }

    }

    async get_links_by_id() {

        const url = `${this.props.config.url.isDev ? (this.props.config.url.dev.url+this.props.config.url.dev.serverPort) : this.props.config.url.url }/api/links/${localStorage.id}`

        const response = await fetch(url)

        const json = await response.json()

        if ( json.user_links ) {
            this.setState({ links: json.user_links })
            localStorage.links = JSON.stringify(json.user_links)
        } else {
            this.setState({ messageText: 'Ошибка' })
            return
        }

    }


    message() {
        return (
            <div className={classes.message} >
                <div className={classes.message__window} >
                    <div className={classes.message__window__text} >{this.state.messageText}</div>
                    <div className={classes.message__window__button} onClick={()=>{this.setState({messageText: ''}) 
                    }}>ok</div>
                </div>
            </div>
        )
    }

    create_link_modal() {
        return (
            <div className={classes.message} >
                <div className={classes.message__window} >
                    <div className={classes.message__window__text} >{this.state.create_link_modal_text}</div>
                    {
                        this.state.subpart_already_exist
                            ? <div className={classes.message__window__subpart_already_exist} >{this.state.subpart_already_exist}</div>
                            : null
                    }
                    <div className={classes.message__window__subpart} >
                        <div>http://localhost:5000/</div>
                        <input
                            type={'text'}
                            id={'subpart'}
                            placeholder='свое окончание ссылки'
                            onKeyDown={ (e) => {
                                if ( e.key == 'Enter' ) {
                                    this.create()
                                }
                            } }
                        />
                    </div>
                    <div className={classes.message__window__button} 
                        onClick={()=>{
                            this.create()
                        }}
                    >Создать</div>
                </div>
            </div>
        )
    }

    open_create_link_modal() {

        const long_link = document.querySelector('#long_link').value.trim()

        if ( long_link === '' ) {
            this.setState({ messageText: 'Вставьте ссылку' })
            return
        }

        if ( !localStorage.id ) {
            this.setState({ messageText: 'Задайте id пользователя' })
            return
        }

        this.setState({ create_link_modal_text: 'Если хотите задать свое окончание короткой ссылки, то заполните поле. Для автоматической генерации оставьте поле пустым.' })
        
    }

    to_page(num_page_new) {
        this.setState({num_page: num_page_new})
        localStorage.num_page = num_page_new
    }

    async create() {

        const long_link = document.querySelector('#long_link').value.trim()

        const formData ={
            "long_link": long_link,
            "id": localStorage.id,
            "subpart": document.querySelector('#subpart').value
        }

        const url = `${this.props.config.url.isDev ? (this.props.config.url.dev.url+this.props.config.url.dev.serverPort) : this.props.config.url.url }/api/links/create`

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {"Content-Type": "application/json; charset=utf-8"}
        })
        const json = await response.json()
        if ( json.message === "exist_short_link" ) {
            this.setState({ subpart_already_exist: 'Такое окончание ссылки уже занято' })
            return
        }
        if ( json.message !== "success" 
            && json.message !== "exist_short_link" 
        ) {
            this.setState({ subpart_already_exist: json.message })
            return
        }
        
        let links = [ {'long_link': long_link, 'short_link':json.short_link}, ...this.state.links ]
        localStorage.links = JSON.stringify(links)
        this.setState({
            links: links
        })

        document.querySelector('#long_link').value = ''
        document.querySelector('#long_link').focus()
        this.setState({ 
            create_link_modal_text: '',
            subpart_already_exist: ''
        })
        
    }
    
    render() {
            return (
                <Layout>
                    {
                        this.state.messageText !== ''
                            ? this.message()
                            : null
                    }
                    {
                        this.state.create_link_modal_text !== ''
                            ? this.create_link_modal()
                            : null
                    }
                    <div className={classes.wrap} >
                        <div className={classes.wrap__window} >
                            <h2>Сервис сокращения ссылок</h2>
                            <h4 onClick={() => { this.props.state.history.push( '/statistics' ) }}>Служебная страница статистики</h4>
                            <h2>
                                User_id: 
                                <input
                                    type={'text'}
                                    id={'user_id'}
                                    defaultValue={this.state.user_id}
                                    className={classes.wrap__window__user_id}
                                    placeholder='Задайте id пользователя'
                                    onKeyDown={ (e) => {
                                        if ( e.key == 'Enter' ) {
                                            this.get_links_by_id()
                                            document.querySelector('#long_link').focus()
                                        }
                                    } }
                                    onInput={(e) => {
                                        localStorage.clear()
                                        localStorage.id = e.target.value
                                        this.setState({
                                            links: [],
                                            num_page: 0
                                        })
                                    }}
                                />
                            </h2>
                            <div className={classes.wrap__window__act_block}>
                                <input
                                    type={'text'}
                                    id={'long_link'}
                                    placeholder='Вставьте ссылку'
                                />
                                <Button
                                    type='white'
                                    onClick={() => {
                                        this.open_create_link_modal()
                                    } }
                                >
                                    Создать
                                </Button>
                            </div>
                            {
                                this.state.links.length !== 0
                                    ? <div className={classes.wrap__window__links} >
                                        {
                                            this.state.links.map((obj, i) => {
                                                if ( i >= this.state.num_page*this.state.count_on_page 
                                                    && i < (this.state.num_page+1)*this.state.count_on_page 
                                                ) {
                                                    return (
                                                        <div className={classes.wrap__window__links__block} key={i}>
                                                                <div className={classes.wrap__window__links__block__long} >
                                                                    { `Длинная ссылка: ${obj.long_link.length > 39
                                                                        ? obj.long_link.slice(0,39)+'...'
                                                                        : obj.long_link
                                                                    }` }
                                                                </div>
                                                                <div className={classes.wrap__window__links__block__short} >
                                                                    { `Короткая ссылка: http://localhost:5000/${obj.short_link}` }
                                                                </div>
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }
                                    </div>
                                    : <p>Вы пока не создали ни одной короткой ссылки</p>
                            }
                            {
                                
                                this.state.links.length > this.state.count_on_page
                                    ? <div className={classes.wrap__window__pagination} >
                                        
                                        {
                                            this.state.links.map((obj, i) => {
                                                if ( 
                                                    i%this.state.count_on_page === 0
                                                ) {
                                                    let cls_pagination_button = [classes.wrap__window__pagination__button]
                                                    if ( i/this.state.count_on_page === this.state.num_page ) {
                                                        cls_pagination_button.push(classes.wrap__window__pagination__button__active)
                                                    }
                                                    return (
                                                        <div className={cls_pagination_button.join(' ')}
                                                            key={i}
                                                            onClick={() => this.to_page(i/this.state.count_on_page) }
                                                        >
                                                                {i/this.state.count_on_page+1}
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }                                   
                                        
                                    </div>
                                    : null
                            }
                        </div>

                    </div>
                </Layout>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        config: state.config
    }
}

function mapDispatchToProps(dispatch) {
    return {
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)