 const App = () => {
        
        const [ gLanguage, setGLanguage ] = React.useState('')
        const [ tools, settools ] = React.useState({
            translate: 'no',
            chat: 'no',
            audio: 'no',
            agent: 'no'
        })

        let audio
        
        const chineseText = {
          
        }

        React.useEffect(()=> {
            if(gLanguage == "chinese") {
                settools({...tools, translate: 'yes'})
            }
        },[gLanguage])

        const TranslateButton = (props) => {
          const toggleButton = () => {
           if(tools.translate == "yes") {
             settools({...tools, translate:'no'})
             setGLanguage('English')
             return
           }
             settools({...tools, translate:'yes'})
             setGLanguage('chinese')
          }
          return(
            <div className={(tools.translate=="yes") ? "on button" : "button"} onClick={(e) => toggleButton()}>{(tools.translate == "yes") ? "中文" : null}<img src="./Assets/translate.svg" /></div>
          )
        }

        const ReadButton = (props) => {
           const toggleButton = () => {
           if(tools.audio == "yes") {
             settools({...tools, audio:'no'})
             return
           }
             settools({...tools, audio:'yes'})
          }
          return(
            <div className={(tools.audio=="yes") ? "on button" : "button"} onClick={(e) => toggleButton()}><img src="./Assets/sound-waves.svg" /></div>
          )
        }

        const AgentButton = (props) => {
             const toggleButton = () => {
               if(tools.agent == "yes") {
                 settools({...tools, agent:'no'})
                 return
               }
             settools({...tools, agent:'yes'})
          return(
            <div className={(tools.agent=="yes") ? "on button" : "button"} onClick={(e) => toggleButton()}><img src="./Assets/voice.svg" /></div>
          )
        }

        React.useEffect(()=> {console.log(tools)},[tools])
        
        const WelcomeScreen = () => {
          
          const [ language, setLanguage ] = React.useState(
            {
              lang: 'English',
              greeting: 'Hi there!'    
            }
          )
          const dropdown = React.useRef(0)
          const languages = [
            {
              lang: 'English',
              greeting: 'Hi there!'
            },
            {
              lang: '中文',
              greeting: '您好!'
            },
            {
              lang: 'Bahasa Melayu',
              greeting: 'Hai!'
            },
            {
              lang: 'தமிழ்',
              greeting: 'வணக்கம்!'
            },
          ]

          const setlanguage = (slanguage) => {
            setLanguage(slanguage)
            dropdown.current.classList.remove('open')
            console.log(slanguage)
          }

          const setglanguage = (glanguage) => {
            let glang = ""
            if(glanguage == "English" || glanguage == "中文") {
              if(glanguage == "中文") {
                glang = "chinese"
              }
             if(glanguage == 'English') {
                glang =  glanguage
              }
              
              setGLanguage(glang)
              return
            }
            else {
              glang = "notready"
              setGLanguage(glang)
            }
          }

          const NotReady = () => {
            return(
              <div className="not-ready">Sorry! It's not ready yet 😓</div>
            )
          }
          
          return(
            <div className="welcome-screen">
              <div className="welcome-totem">
                <div className="greeting">{language.greeting}</div>
                <img src="./Assets/person.svg" className="person"/>
                <div className="language-container">
                  <div className="selected-language" onClick={(e) => dropdown.current.classList.add('open')}>{language.lang}</div>
                  <div className="language-dropdown" ref={dropdown}>
                    {
                      languages.map(item => (<div className="language" onClick={(e) => setlanguage(item)}>{item.lang}</div>))
                    }
                  </div>    
                </div>
                <div className="confirm-language"  onClick={(e) => setglanguage(language.lang)}><img src="./Assets/check-mark.svg" /></div>
                {
                  (gLanguage == "notready") ? <NotReady /> : null
                }
              </div>
              
            </div>
          )
        }

        const InfoWeb = () => {
          
          const OnBoarding = () => {
            const onboardingtext = {
              english : {
                desc: "Tools to help you out!",
                translate: "Translate",
                read: "Read aloud",
                agent: "Ask us!",
                done: "I've understood"
              },
              中文: {
                desc: "帮助您的工具!",
                translate: "翻译",
                read: "朗读",
                agent: "向我们询问!",
                done: "我了解了"
              }
            }
            const Crumbs = () => {
              return(
                <div className="crumbs">Main Page</div>
              )
            }

            const LastConversation = () => {
              return( 
                  <div className="last-conversation">How do I change tenants</div>
              )
            }

            const Filler = () => {
                return(
                    <div className="filler">filler</div>
                )
            }
             
            return(
              <div className="relative">
                <div className="infoweb-onboarding-overlay">
                    <div className="top-grid">
                      <Crumbs />
                      <div className="button-grid">
                        <TranslateButton />
                        <ReadButton />
                      </div>
                    </div>
                    <div className="bottom-grid">
                        {
                            (tools.chat == "yes") ? <LastConversation /> : <Filler />
                        }                   
                        <AgentButton />
                    </div>
                </div>
              </div>
            )
          }

          const AudioWrap = (props) => {
            const [ isplay, setplay ] = React.useState()
            const audioplayer = React.useRef(0)
            
            const playAudio = () => {
             
              if(!audioplayer.current.paused) {
                audioplayer.current.pause()
                setplay(false)
              }
               if(audioplayer.current.paused) {
                audioplayer.current.play()
                setplay(true)
              }
            }
              const stopPlay = () => {
                  audioplayer.current.pause()
                  audioplayer.current.currentTime = 0
              }
           if(audioplayer.current.paused !== undefined) {
               audioplayer.current.onended = () => {
                   setplay(false)
               }
           } 
            
            return(
              <div className="audio-wrap" onClick={(e) => playAudio()}>
                {
                    (isplay) ? <div className="play-wrap"><div className="play"><img src="./assets/sound.gif" />reading aloud..</div><img src={"./images/hdb-" + gLanguage + "-" + tools.audio + "audio-active_"+props.val+".gif"} className="active-overlay"/></div> : null
                } 
                <audio ref={audioplayer}>
                  <source src={"./assets/" + gLanguage + "-" + props.val + ".mp3"}></source>
                </audio>
                {
                  props.children
                }
              </div>
            )
          }
          
          return(
            <div className="infoweb-container">
              <OnBoarding />
              <div className="image-wrap">
                  <img src={"./images/hdb-" + gLanguage + "_01.gif"} class="infoweb-underlay"/>
                  {(tools.audio=="yes") ? <AudioWrap val="02"><img src={"./images/hdb-" + gLanguage + "-" + tools.audio + "audio_02.gif"} class="infoweb-underlay"/></AudioWrap> : <img src={"./images/hdb-" + gLanguage + "-" + tools.audio + "audio_02.gif"} class="infoweb-underlay"/>}
                  {(tools.audio=="yes") ? <AudioWrap val="03"><img src={"./images/hdb-" + gLanguage + "-" + tools.audio + "audio_03.gif"} class="infoweb-underlay"/></AudioWrap> : <img src={"./images/hdb-" + gLanguage + "-" + tools.audio + "audio_03.gif"} class="infoweb-underlay"/>}             
                  <img src={"./images/hdb-" + gLanguage + "_04.gif"} class="infoweb-underlay"/>
              </div>
            </div>
          )
        
        }
        return (
          <div className="app-interface">
            <WelcomeScreen /> 
            {
              (gLanguage.length != "0" && gLanguage !== "notready") ? <InfoWeb /> : null
            }
          </div>
        )
      } 