import React, { Component } from 'react';
import { 
    StyledLi, 
    StyledUl, 
    StyledDiv, 
    StyledTitle, 
    FrequencyTitle, 
    WrapperDiv, 
    StyledButton, 
    CharCount, 
    NumberCount, 
    CountLi, 
    FrequencyDiv } from '../styles/peoplePage';
import '../styles/peoplePage.css';

class PeoplePage extends Component {
    state = {
        info: [],
        loaded: false,
        count: {},
        display: false
    }

    componentDidMount = async () => {
        const data = await this.loadData();
        const emails = data.data;
        //Initializing empty object to store frequency count for letters
        const counter = {}
        //Initializing empty array to store new emails after regexing non-alphabetical chars
        const newEmails = [];
        //Initializing empty array to store unique chars from each email
        const uniqueChar = [];
        //Initializing empty array to store sorted array (descending order)
        const sortedArray = [];
        //Regex'ing the non-alphabetical chars
        emails.forEach((person) => {
            const unique = person.email_address.replace(/\_|\@|\.+/g, '');
            newEmails.push(unique);
        })
        //Getting unique letters from email
        newEmails.forEach(async (email) => {
            const hii = await this.uniqueLetters(email);
            uniqueChar.push(hii);
        })
        //Calling setTimeout because of async function above
        setTimeout(() => {
            //Loop to store frequency count of chars
            uniqueChar.forEach(async (person) => {
                for (var i=0; i<person.length;i++) {
                    const character = person.charAt(i);
                    if (counter[character] === undefined) {
                        counter[character] = 1;
                    } else {
                        counter[character]++;
                    }
                }
            })
            //Initial sort to sort in ascending order
            for (const letter in counter) {
                sortedArray.push([letter, counter[letter]])
            }
            //Final sort to sort in descending order
            const sorted = sortedArray.sort((a, b) => b[1] - a[1]);

            this.setState({ 
                info: data, 
                loaded: true,
                count: sorted
            })
        }, 1000)

    }

    loadData = async () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://api.salesloft.com/v2/people.json';
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(proxyurl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = response.json();
        return data;
    }

    //Function to get unique letters from regex'd emails
    uniqueLetters = async (string) => {
        let str = string;
        let newStr = '';
        for (let i=0; i<str.length; i++) {
            if(newStr.indexOf(str.charAt(i)) === -1) {
                newStr += str[i]
            }
        }
        return newStr;
    }

    handleClick = async () => {
        const test = document.getElementsByClassName('frequency');
        if (!this.state.display) {
            //Adding class appear when clicked
            test[0].classList.add('appear');
            //Setting state to true so when clicked again, it will run else statement
            this.setState({ display: true })
        } else {
            //Removing class appear when state is true
            test[0].classList.remove('appear');
            //Setting state back to false so when clicked again, it will run if statement
            this.setState({ display: false })
        }
    }

    render() {
        const { info, loaded, count } = this.state;

        return (
            loaded !== false ?
            <WrapperDiv>
                <StyledDiv>
                    <StyledUl>
                        <StyledTitle>Name</StyledTitle>
                        {info.data.map((person, index) =>
                            <StyledLi key={`person${index}`}>
                                {person.first_name}
                            </StyledLi>
                        )}
                    </StyledUl>
                    <StyledUl>
                        <StyledTitle>Email</StyledTitle>
                        {info.data.map((person, index) =>
                            <StyledLi key={`person${index}`}>
                                {person.email_address}
                            </StyledLi>
                        )}
                    </StyledUl>
                    <StyledUl>
                        <StyledTitle>Job Title</StyledTitle>
                        {info.data.map((person, index) =>
                            <StyledLi key={`person${index}`}>
                                {person.title}
                            </StyledLi>
                        )}
                    </StyledUl>
                </StyledDiv>
                <StyledButton onClick={(e) => this.handleClick(e)}>Press Me</StyledButton>
                <FrequencyDiv className='frequency'>
                    <CharCount>
                        <FrequencyTitle>Character</FrequencyTitle>
                        {count.map((letter, index) => 
                            <CountLi key={`letter${index}`}>
                                {letter[0]}
                            </CountLi>
                        )}
                    </CharCount>
                    <NumberCount>
                        <FrequencyTitle>Count</FrequencyTitle>
                        {count.map((letter, index) => 
                            <CountLi key={`letter${index}`}>
                                {letter[1]}
                            </CountLi>
                        )}
                    </NumberCount>
                </FrequencyDiv>
            </WrapperDiv>
            : ''
        )
    }
}

export default PeoplePage;