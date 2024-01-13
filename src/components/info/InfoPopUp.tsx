import React, { useState } from 'react';
import Modal from 'react-modal';
import "../styles/InfoPopUp.scss"

interface ImageProps {
    src: string;
    alt: string;
    description: string;
}

export const Image = (props: ImageProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <img
                className="tour-img"
                src={props.src}
                alt={props.alt}
                onClick={openModal}
                style={{ width: '100%', cursor: 'pointer' }}
            />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                    },
                    content: {
                        width: '1050px',
                        margin: 'auto',
                        height: '660px',
                        zIndex: "1000",
                        padding: '0px',
                        background: '#171717',
                        border: "3px solid #007aff",
                        borderRadius: "20px",
                        color: "white",
                        textAlign: "center"
                    },
                }}
            >
                <div>
                    <img src={props.src} alt={props.alt} style={{ width: '100%' }} />
                    <h2>{props.alt}</h2>
                    <p style={{padding: "10px 20px 5px 20px", textAlign: "justify"}}>{props.description}</p>
                    <a href='#' className="close" onClick={closeModal}></a>
                </div>
            </Modal>
        </div>
    );
};

