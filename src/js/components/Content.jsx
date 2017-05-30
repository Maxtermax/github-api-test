import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      url: this.props.url
    }
    this.request();
  }

  parseResponse(data) {
    if(!Array.isArray(data)) data = [data];
    data = data.map(({id, description="No description", owner = {login:"Anonymous",avatar_url:"https://kiwicdn.akamaized.net/a494/MKj2sXDbx3YMXN6iXRk46c.jpg" }, created_at, files={} })=> {
      return {
        description: description || "No description",
        name: owner.login,
        avatar_url: owner.avatar_url,
        created_at,
        files,
        ownerId: owner.id,
        gistsId: id
      }
    })
    this.setState({data});
  }//end parseResponse

  request() {
    let settings = {
      async: true,
      crossDomain: true,
      url: this.state.url,
      method: "GET",
      processData: false,
      contentType: false,
      statusCode: {
        200: (data)=> {
          this.parseResponse(data);
        }
      }
    }
    $.ajax(settings);
  }//end request

  showDetails(data) {
    if(this.props.details){
      return (
        <div className="wrap-details">

          <div className="wrap-files">
            <h2>Listado de archivos</h2>
            <ul>
              {

                Object.keys(data.files).map((file, index)=> {
                  let currentFile = data.files[file];
                  return (
                    <li key={index}>
                    <a href={currentFile.raw_url}>{currentFile.filename}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <a href="/">Volver</a>
        </div>
      )
    } else {
      return (
        data.gistsId ? <a href={"/"+data.gistsId}>Ver detalles</a> : ''
      )
      //Anonymous user without gistsId
    }

  }//end showDetails

  paintGists() {
    let gists = this.state.data;
    return (
      <div>
        {
          gists.map((data, index)=> {
            return (
              <div className="large-3 columns" key={index}>
                <img className="gists_image" src={data.avatar_url}/>
                <h1>{data.name}</h1>
                <span className="wrap-github-link">
                {
                  data.ownerId ? <a href={"https://github.com/"+data.name}>Ver perfil de github</a>: ''

                }
                </span>
                <p className="gists_description">{data.description}</p>
                <span>Fecha de creacion: {data.created_at}</span>
                <div>
                  {this.showDetails(data)}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }//end paintGists

  requestMore() {
    let page = this.state.page;
    page++;
    let url =  `https://api.github.com/gists/public?page=${page}&per_page=30`;
    this.setState({url, page});
    this.request()
  }//end requestMore

  showButtonLoadMore() {
    return (
      <div>
        <span>Pagina actual: {this.state.page}</span>
        <button onClick={this.requestMore.bind(this)}>Ver mas</button>
      </div>
    )
  }//end showButtonLoadMore

  render() {
    let noDetails = !this.props.details;
    return (
      <div className="row">

        {noDetails ? this.showButtonLoadMore() : ''}
        {this.paintGists()}
      </div>
    )
  }//end render
}
