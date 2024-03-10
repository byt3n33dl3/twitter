import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = ({ isLoading = true }: { isLoading?: boolean }) => {

    return (
        isLoading ?
            <div className="absolute flex flex-column flex-1 w-svw h-svh z-50 items-center justify-center bg-white ">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div> : <></>
    )
}

export default Loading;