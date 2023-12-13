import React from 'react'
// import 'font-awesome/css/font-awesome.min.css';
import '../style/SharingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faBars, faXmark, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    EmailIcon,
    LinkedinIcon,RedditIcon,TelegramIcon,
    TwitterIcon,WhatsappIcon

  } from "react-share";


function SharingPage({closeShowShareModal}) {

    const currentPageURL = window.location.href;
  return (
    <>
    <div className="modal-wrapper3">
    <div className="modal-container3">
        <FontAwesomeIcon icon = {faXmark} className="fa-solid fa-xmark" onClick={closeShowShareModal} />
        {/* <i class="fa-solid fa-xmark" onClick={closeShowShareModal}></i> */}
        


        <div className="menu">
            <div className="fir">

                <WhatsappShareButton 
                url = {currentPageURL}
                quote = 'Score of the player'
                hashtag = '#Score'>
                    <WhatsappIcon></WhatsappIcon>
                </WhatsappShareButton>

                <LinkedinShareButton
                url = {currentPageURL}
                quote = 'Score of the player'
                hashtag = '#Score'
                >
                <LinkedinIcon></LinkedinIcon>
                </LinkedinShareButton>

                <EmailShareButton
                url = {currentPageURL}
                quote = 'Score of the player'
                hashtag = '#Score'
                >
                    <EmailIcon></EmailIcon>
                </EmailShareButton>

                <TelegramShareButton
                url = {currentPageURL}
                quote = 'Score of the player'
                hashtag = '#Score'
                >
                    <TelegramIcon></TelegramIcon>
                </TelegramShareButton>

            </div>
            <br />
            <div className="fir">
                <RedditShareButton
                url = {currentPageURL}
                quote = 'Score of the player'
                hashtag = '#Score'
                >
                    <RedditIcon></RedditIcon>
                </RedditShareButton>

                <FacebookShareButton
                url = {currentPageURL}
                quote = 'Score of the player'
                hashtag = '#Score'
                >
                    <FacebookIcon></FacebookIcon>
                </FacebookShareButton>

                <TwitterShareButton
                url = {currentPageURL}
                quote = 'Score of the player'
                hashtag = '#Score'
                >
                    <TwitterIcon></TwitterIcon>
                </TwitterShareButton>

                
            </div>
            {/* <br />
            <div className="fir">for</div>
            <br />
            <div className="fir">placing</div>
            <br />
            <div className="fir">additional</div>
            <br />
            <div className="fir">options</div>
            <br />
            <div className="fir">to</div>
            <br />
            <div className="fir">find</div>
            <br />
            <div className="fir">more about</div> */}
        </div>
    </div>


</div>

</>
  )
}

export default SharingPage