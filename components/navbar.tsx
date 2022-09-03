import { FC } from "react";
import {
	MagnifyingGlassIcon,
	PlusCircleIcon,
	HeartIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import addModelState from "../States/addModel";

const Navbar: FC = () => {
	// add model state
	const [addModel, setAddModel] = useRecoilState(addModelState);

	return (
		<nav className="fixed bottom-0 z-50 px-2 w-screen h-24 flex justify-center items-center">
			<div
				className="bg-dark h-full max-w-md w-full -translate-y-1.5 flex justify-between px-8 items-center"
				style={{
					borderRadius: "35px",
				}}
			>
				<button className="hover:scale-110 duration-300 ease-in-out hover:-translate-y-2 p-3">
					<HomeIcon className="w-7 h-7 text-white" />
				</button>
				<button className="hover:scale-110 duration-300 ease-in-out hover:-translate-y-2 p-3">
					<MagnifyingGlassIcon className="w-7 h-7 text-white" />
				</button>
				<button
					onClick={() => {
						addModel ? setAddModel(false) : setAddModel(true);
					}}
					className="hover:scale-110 duration-300 ease-in-out hover:-translate-y-2 p-3"
				>
					<PlusCircleIcon className="w-7 h-7 text-white" />
				</button>
				<button className="hover:scale-110 duration-300 ease-in-out hover:-translate-y-2 p-3">
					<HeartIcon className="w-7 h-7 text-white" />
				</button>
				<button className="hover:scale-110 duration-300 ease-in-out hover:-translate-y-2 p-3">
					<UserIcon className="w-7 h-7 text-white" />
				</button>
			</div>
		</nav>
	);
};
export default Navbar;
