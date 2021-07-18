import React, { useState } from 'react';
import FakeData from '../FakeData.json';
import Folder from "./Folder";

const Layout = () => {
    const [data, setData] = useState(FakeData);
    const [currentData, setCurrentData] = useState(FakeData);
    const [breadcrumbs, setBreadcrumbs] = useState([{ title: "home", index: -1, id: FakeData.id }])
    const [moveBreadcrumbs, setMoveBreadcrumbs] = useState([{ title: "home", index: -1, id: FakeData.id }])

    const [currentMoveFolder, setCurrentMoveFolder] = useState(data);

    const [toggle, setToggle] = useState(false);
    const [image, setImage] = useState(null);

    const onFolderClick = (index) => {
        //console.log(index);
        let temp = [...breadcrumbs];
        temp = [...temp, { title: currentData.album[index].albumTitle, index: index, id: currentData.album[index].id }]

        setBreadcrumbs(temp);
        setMoveBreadcrumbs(temp);
        setCurrentData(currentData.album[index]);
        setCurrentMoveFolder(currentData.album[index]);
    }

    const onBreadCrumbsClick = (index) => {
        // for current Data
        let newData = { ...data };
        let wantData = breadcrumbs.slice(1, index + 1);
        let tempData = { ...newData };

        wantData.forEach(x => { tempData = { ...tempData.album[x.index] } })
        newData = index ? tempData : newData;

        setCurrentData(newData);
        setCurrentMoveFolder(newData);
        setBreadcrumbs(breadcrumbs.slice(0, index + 1));
        setMoveBreadcrumbs(moveBreadcrumbs.slice(0, index + 1));
    }

    //console.log("outer : ",currentMoveFolder);


    const onMove = (indexOfImage, folderIndex, id) => {
        let index = breadcrumbs.length - 1;
        if (index === 0) {
            return
        }

        let moveFolderData = { ...currentMoveFolder };
        let moveImagedata = { ...currentData };

        //console.log(currentMoveFolder);
        const imageValue = moveImagedata.albumImage[indexOfImage];
        // moveFolderData.album[folderIndex].albumImage.push(imageValue);
        moveImagedata.albumImage.slice(indexOfImage, 1);

        let newData = { ...data };

        newData.album.forEach(function iter(a, i) {
            //console.log(a);
            if (breadcrumbs[breadcrumbs.length - 1].id === a.id) {
                //console.log(a.id, breadcrumbs[breadcrumbs.length - 1].id, a, indexOfImage);
                a.albumImage.splice(indexOfImage, 1);
                //console.log(a);
            }
            if (id === a.id) {
                //console.log(a.id, id, a, imageValue);
                a.albumImage.push(imageValue);
                //console.log(a);
            }
            Array.isArray(a.album) && a.album.forEach(iter);
        })

        // newData = index ? tempData : newData;
        //console.log(newData);

        setCurrentMoveFolder(moveFolderData);
        setCurrentData(moveImagedata);
        setData(newData);
        setToggle(!toggle);
        setImage(!toggle ? folderIndex : null);
    }

    const onMoveBack = () => {
        let index = moveBreadcrumbs.length - 1;
        if (index === 0) {
            return
        }
        let newData = { ...data };
        let wantData = moveBreadcrumbs.slice(1, index);
        let tempData = { ...newData };

        wantData.forEach(x => { tempData = { ...tempData.album[x.index] } })
        newData = index ? tempData : newData;

        setCurrentMoveFolder(newData);
        setMoveBreadcrumbs(moveBreadcrumbs.slice(0, index));
    }

    const onMoveForward = (index) => {
        let tempBreadCrumbs = [...moveBreadcrumbs];
        tempBreadCrumbs = [...tempBreadCrumbs, { title: currentMoveFolder.album[index].albumTitle, index: index, id: currentMoveFolder.album[index].id }];

        setCurrentMoveFolder(currentMoveFolder.album[index]);
        setMoveBreadcrumbs(tempBreadCrumbs);
    }

    const backButton = () => {
        // for current Data
        let index = breadcrumbs.length - 1;
        if (index === 0) {
            return
        }
        let newData = { ...data };
        let wantData = breadcrumbs.slice(1, index);
        let tempData = { ...newData };

        wantData.forEach(x => { tempData = { ...tempData.album[x.index] } })
        newData = index ? tempData : newData;

        setCurrentData(newData);
        setCurrentMoveFolder(newData);
        setBreadcrumbs(breadcrumbs.slice(0, index));
        setMoveBreadcrumbs(moveBreadcrumbs.slice(0, index));
    }

    const setDefaultMove = () => {
        console.log(toggle);
        setCurrentMoveFolder(currentData);
        setMoveBreadcrumbs(breadcrumbs);
        setToggle(!toggle);
        setImage(null);
    }

    return (
        <div className="mainLayout">

            <button onClick={backButton}>
                Back
            </button>
            <div className="breadcrumbs">
                {breadcrumbs.map((x, i) =>
                    <div key={i} className="breadcrumbs-title" onClick={() => onBreadCrumbsClick(i)}>
                        {x.title}
                    </div>
                )}
            </div>

            <div className="folder-space">
                {/* {currentData.album.map((x, i) => */}
                <Folder
                    data={currentData}
                    onFolderClick={onFolderClick}
                    currentMoveFolder={currentMoveFolder}
                    onMove={onMove}
                    onMoveBack={onMoveBack}
                    setDefaultMove={setDefaultMove}
                    onMoveForward={onMoveForward}
                    image={image}
                    toggle={toggle}
                    setImage={setImage}/>
                {/* )} */}
            </div>
        </div>
    )
}

export default Layout;