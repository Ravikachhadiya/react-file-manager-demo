import React from 'react';
import { Popover, Button } from 'antd';
// import { Button } from 'antd';

const Folder = ({ data, onFolderClick, currentMoveFolder, onMoveBack, onMove, setDefaultMove, onMoveForward, image, toggle, setImage}) => {

   
    const title = (title) => {
        // //console.log(title)
        return (
            <>
                <Button type="link" onClick={onMoveBack}>
                    Back
                </Button>
                <p>{title}</p>
            </>
        )
    }

    const content = (contentData, indexOfImage) => {
        //console.log(currentMoveFolder, contentData)
        return (
            <>
                {(contentData && contentData.length !== 0) &&
                    contentData.map((x, i) =>
                        <div key={i} className="folder-move-item" >
                            <p onClick={() => { onMove(indexOfImage, i, x.id) }}>{x.albumTitle}</p>
                            <button onClick={() => { onMoveForward(i) }}>&gt;</button>
                        </div>
                    )}
            </>
        )
    }
    // console.log(imageArray ,toggle);
    return (
        <>
            <div>
                {(data.album && data.album.length !== 0) &&
                    data.album.map((x, i) =>
                        <div key={i} className="folder" onClick={() => onFolderClick(i)}>
                            {x.albumTitle}
                        </div>
                    )}
            </div>
            {(data.albumImage && data.albumImage.length !== 0) &&
                data.albumImage.map((x, i) =>
                    <Popover
                        key={i}
                        visible={toggle && image===i}
                        placement="bottomLeft"
                        content={content(currentMoveFolder.album, i)}
                        title={title(currentMoveFolder.albumTitle)}
                        trigger="click"
                        onVisibleChange={() => { setDefaultMove(); setImage(i); }}
                    >
                        <div className="folder">
                            {"Image : " + x}
                        </div>
                    </Popover>
                )}
        </>
    )
}

export default Folder;