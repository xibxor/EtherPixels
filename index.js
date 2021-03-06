const contractAddr = "0x18e1438312262214db7ad40def5542f9e783560a";
const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

var numThreads = 3;

var i = -1;
setTimeout(() => {
	while (numThreads--){
		var thread = {i: i};
		thread.cb = cb.bind(thread);
		thread.cb();
	}
}, 1000);


const unpair = (z) => {
	const w = Math.floor(
		(Math.sqrt(8 * z + 1) - 1) / 2
	);
	const t = (w*w + w) / 2;
	const y = z - t;
	const x = w - y;

	return [x,y];
};

const pair = (x,y) => (
	(x + y + 1) * (x + y) / 2 + y
);

function cb(err, val){
	if (val){
		val
			.slice(2)
			.split("")
			.map(v => ("000" + parseInt(v,16).toString(2)).slice(-4))
			.join("")
			.split("")
			.forEach((v, idx) => {
				const coords = unpair(this.i + idx + 1);
				ctx.fillStyle = v == "0" ? "#000" : "#fff";
				ctx.fillRect(coords[0] - 1, coords[1] - 1, 1, 1);
			});
	}
	if ((++i) == 1024){
		return;
	}
	this.i = i;
	web3.eth.getStorageAt(contractAddr, i, this.cb);
}