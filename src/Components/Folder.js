import React from 'react';

const Folder = ({ data, onFolderClick, index }) => {
    return (
        <>
            <div>
                {(data.album && data.album.length !== 0) &&
                    data.album.map((x, i) =>
                        <div className="folder" onClick={() => onFolderClick(i)}>
                            {x.albumTitle}
                        </div>
                    )}
            </div>
            {(data.albumImage && data.albumImage.length !== 0) &&
                data.albumImage.map((x, i) =>
                    <div className="folder">
                        {"Image : " + x}
                    </div>
                )}
        </>
    )
}

export default Folder;