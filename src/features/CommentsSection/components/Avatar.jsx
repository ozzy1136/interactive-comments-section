import Image from "next/image";
import { avatar, avatar_border } from "../assets/styles/Comments.module.css";

export default function Avatar({ src, username }) {
	return (
		<div className={avatar}>
			<Image
				src={src}
				fill
				sizes="1.7em"
				alt={`Profile photo of user ${username}`}
			/>
			<div className={avatar_border}></div>
		</div>
	);
}
