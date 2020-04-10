class FF {
    constructor() {
        this.z = document.querySelectorAll('.klasa');
        this.x = true;
        this.y = document.querySelector('#stat');
        this.btn = document.querySelectorAll('.btn');
        this.arr = [];
        this.reset = this.reset.bind(this, this.z);
        this.move = this.move.bind(this);
        this.ucitaj = this.ucitaj.bind(this);
        this.ucitaj();
        this.z.forEach(a => a.addEventListener('click', this.move, { once: true }));
        this.btn.forEach(a => a.addEventListener('click', () => {
            this.reset();
            this.ucitaj();
            this.z.forEach(a => a.addEventListener('click', this.move, { once: true }));
        }));
    }
    
    move(a) {
        
//        Deciding which value to insert into field and inserting the exact value
        
        a.target.innerHTML = this.x ? 'X' : 'O';
		
//        Changing value on the opposite value in next move if it was x it will be o next time or opposite

        this.x = !this.x;
        let win = this.chckWinner.bind(this, this.z);
		
//        Checking if the winner exists         

        if(win()) {
            
            this.y.innerHTML = `Winner of this game is: ${win()}!!!`;
          
//            Displaying div for the winner and end of the game
            
            document.querySelector('#win').style.display = 'grid';
            
//            Event for save function on button save

            document.querySelector('.btn4').addEventListener('click', () => {
//                Saving winner
                
				this.save(win());
				
//                Starting new game
                
				this.reset();
				
//                Adding listeners to fields
                
				this.z.forEach(a => a.addEventListener('click', this.move, { once: true }));
                let prikaz = document.querySelector('#win');
				
//                Checking if win div is visible to make him invisible
               
  			    prikaz.style.display === 'grid' ? prikaz.style.display = 'none' : '';
            });
            
            document.querySelector('#winner').innerHTML = `Winner of this game is ${win()}`;
			
        } else {
            
            
//            Show which player is on the move
            
            this.y.innerHTML = `Next player is ${this.x ? 'X' : 'O'}`;
            
            this.arr.push(a.target.innerHTML);
			
//            Checking if the result is draw
                        
            if(this.arr.length >= 9) {
                this.y.innerHTML = `The result is draw!!!`;
            }
        }
        
        
    }
    
    
//    Function that return winner of the game
    
    chckWinner(el) {
        let comb = [
            [0,1,2],
            [0,3,6],
            [6,7,8],
            [2,5,8],
            [7,4,1],
            [3,4,5],
            [0,4,8],
            [2,4,6]
        ];
        
        for(let i = 0; i < comb.length; i++) {
            let [a, b, c] = comb[i];
            if(el[a].innerHTML && el[a].innerHTML === el[b].innerHTML && el[b].innerHTML === el[c].innerHTML) {
                return el[a].innerHTML;
            }
        }
        return;
    }
    
//    Function to reset (make new game)
    
    reset(el) {
        this.x = true;
        document.querySelector('#win').style.display = 'none';
        for(let i = 0; i < el.length; i++) {
            el[i].innerHTML = '';
        }
        this.arr = [];
        this.y.innerHTML = `Next player is ${this.x ? 'X' : 'O'}`;
    }
	
//    Onload shows which player has won in the last game

    ucitaj() {
        if(localStorage.getItem('winner')) {
            this.y.innerHTML = `Winner in last game was ${localStorage.getItem('winner')}`;
        } else {
            this.y.innerHTML = `Next player is ${this.x ? 'X' : 'O'}`;
        }
        
    }
    
//    Saving winner in local storage
    
    save(el) {
        if(el) {
            localStorage.setItem('winner', el);
        }
    }
}

let ins = new FF();