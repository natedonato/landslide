function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');


        ctx.strokeRect(100, 100, 20, 40);

        ctx.fillStyle = '#FFA500';
        ctx.fillRect( 20, 20, 40, 40);
        ctx.fillStyle = '#000000';

        ctx.clearRect( 25, 25, 10, 30);


        ctx.fillRect( 150, 150, 50, 50);
        

        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(175, 175, 20, 0, 2 * Math.PI);
        ctx.fill();



        ctx.beginPath();
        ctx.moveTo(75, 75);
        ctx.lineTo(100, 75);
        ctx.lineTo(75, 100);
        ctx.fill();

    }
}