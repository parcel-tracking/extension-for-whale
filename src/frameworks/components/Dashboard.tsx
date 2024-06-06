import { v4 as uuidv4 } from "uuid"
import { useState, useEffect, Fragment } from "react"
import styled from "@emotion/styled"

import { TRACKER_LIST } from "../../constants"
import ITrackerDTO from "../../core/dtos/interfaces/ITrackerDTO"
import ICarrierDTO from "../../core/dtos/interfaces/ICarrierDTO"
import Tracker from "../../core/domains/entities/Tracker"
import CloseIcon from "./icons/CloseIcon"
import TipMessage from "./TipMessage"
import Footer from "./Footer"
import TrackerBox from "./TrackerBox"
import AddTrackerBtn from "./AddTrackerBtn"
import ctrl from "../di"

const Dashboard = () => {
  const [selectBoxOpenIdx, setSelectBoxOpenIdx] = useState(0)
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  const [trackerList, setTrackerList] = useState<ITrackerDTO[]>([])
  const [carrierList, setCarreirList] = useState<ICarrierDTO[]>([])

  const handleClickBody = () => {
    if (selectBoxOpenIdx === 0) return
    setSelectBoxOpenIdx(0)
  }

  const handleClickClearErrorMessage = () => {
    setIsErrorMessage(false)
  }

  const showErrorMessage = () => {
    setIsErrorMessage(true)
  }

  useEffect(() => {
    getCarrierList()
  }, [])

  const getCarrierList = async () => {
    const { isError, data } = await ctrl.carrier.getCarriers()
    if (isError) return
    setCarreirList(data)
  }

  useEffect(() => {
    if (carrierList.length === 0) return
    checkDataMigration()
  }, [carrierList])

  const checkDataMigration = async () => {
    const oldData = localStorage.getItem("DELIVERY_DATA")
    if (oldData === null) {
      getTrackerList()
      return
    }
    const oldObj = JSON.parse(oldData)
    const newTrackers = oldObj.map(({ uid, label, code, memos }) => {
      return new Tracker({
        id: uuidv4(),
        carrierId: carrierList.find((carrier) => carrier.no === uid).id,
        label: label,
        trackingNumber: code,
        memos: memos
      })
    })
    localStorage.setItem(TRACKER_LIST, JSON.stringify(newTrackers))
    localStorage.removeItem("DELIVERY_DATA")
    getTrackerList()
  }

  const getTrackerList = async () => {
    const { isError, data } = await ctrl.tracker.getTrackers()
    if (isError) return
    setTrackerList(data)
  }

  return (
    <$area onClick={handleClickBody}>
      <$title>택배 배송 조회</$title>
      <$content>
        {isErrorMessage && (
          <$errorMessage>
            <p>
              알 수 없는 오류가 발생하였습니다.
              <br />
              오류가 반복될 경우 아래의 <strong>[초기화]</strong>를 진행해
              주세요.
            </p>
            <div onClick={handleClickClearErrorMessage}>
              <CloseIcon />
            </div>
          </$errorMessage>
        )}
        <$trackerArea>
          {trackerList.map((tracker, i) => {
            const findCarrier = carrierList.find(
              ({ id }) => id == tracker.carrierId
            )
            const carrier = findCarrier ? findCarrier : carrierList[0]
            return (
              <Fragment key={tracker.id}>
                <TrackerBox
                  carrierList={carrierList}
                  carrier={carrier}
                  tracker={tracker}
                  index={i}
                  selectBoxOpenIdx={selectBoxOpenIdx}
                  setSelectBoxOpenIdx={setSelectBoxOpenIdx}
                  getTrackerList={getTrackerList}
                  showErrorMessage={showErrorMessage}
                />
              </Fragment>
            )
          })}
        </$trackerArea>
        <AddTrackerBtn
          getTrackerList={getTrackerList}
          showErrorMessage={showErrorMessage}
        />
        <TipMessage getTrackerList={getTrackerList} />
      </$content>
      <Footer />
    </$area>
  )
}

export default Dashboard

const $area = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const $content = styled.div`
  padding-bottom: 40px;
`

const $title = styled.h1`
  font-size: 16px;
  font-weight: normal;
  background: #fff;
  margin: 0;
  padding: 0 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  color: #000;
  line-height: 49px;
`

const $errorMessage = styled.div`
  margin: 20px 20px 0;
  padding: 10px 12px 9px;
  background: #ffd4b9;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
  line-height: 18px;
  font-size: 12px;
  color: #444;
  position: relative;
  p {
    margin: 0;
  }
  div {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    padding: 5px;
  }
`

const $trackerArea = styled.section`
  padding: 20px 20px 0;
`
