export default function CheckPageLayout({ children }) {
	return (
		<html lang="en">
			<body>
				{children}

				<script
					dangerouslySetInnerHTML={{
						__html: `var dots = document.getElementById("dots");
                        var contentText = document.getElementById("content");
                        var btnText = document.getElementById("buttonReadMore");
                        btnText.addEventListener("click", function(){
                            // console.log("Triggered");
                            if (dots.style.display === "none") {
                                dots.style.display = "inline";
                                btnText.innerHTML = "Click to Read More About the Blog";
                                contentText.style.display = "none";
                            } else {
                                dots.style.display = "none";
                                btnText.innerHTML = "Read Less";
                                contentText.style.display = "inline";
                            }
                        });`,
					}}
				></script>
			</body>
		</html>
	);
}
