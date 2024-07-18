
function expand(element) 
{
  element.style['height'] = get_height(element);
  for (let obj of element.children)
  {
    if (obj.classList.contains('hidden'))
      obj.classList.remove('hidden');
  }
  element.style['height'] = get_height(element);
  setTimeout(function (){
    element.style['height'] = 'auto';
  },200);
}

function collapse(element, arr)
{
  element.style['height'] = get_height(element);
  for (let child of element.children)
    {
      if (search(arr,child))
        child.classList.add('hidden');
    }
  element.style['height'] = get_height(element);
  setTimeout(function (){
    element.style['height'] = 'auto';
  },200);
}

function get_height(element) 
{
  let height = 0;
  for (let obj of element.children)
  {
    if (!obj.classList.contains('hidden'))
    {
      const style = window.getComputedStyle(obj);
      height += parseFloat(style['height']);
      height += parseFloat(style['margin-top']) + parseFloat(style['margin-bottom']);
      height += parseFloat(style['padding-top']) + parseFloat(style['padding-bottom']);
      height += parseFloat(style['border-top']) + parseFloat(style['border-bottom']);
    }
  }
  return height + 'px';
}

function search(arr, key)
{
  for (let i = 0; i < arr.length; i++)
  {
    if (arr[i] == key)
      return true;
  }
  return false;
}

let input = [document.querySelector('#home>section>form>div>div:nth-child(1)'),document.querySelector('#FAQ>div>form>div>div>div:nth-child(1)')];
for (let i = 0; i < 2; i++)
{
  input[i].children[1].addEventListener('focus',function (){
    let placeholder = input[i].children[0];
    placeholder.style['font-size'] = '0.75rem';
    placeholder.style['padding-top'] = '0px';
    placeholder.style['padding-bottom'] = '0px';
    placeholder.style['height'] = window.getComputedStyle(input[i].children[1])['padding-top'];
    placeholder.style['top'] = '0px';
  });
  input[i].children[1].addEventListener('blur',function (){
    input[i].children[0].style = '';
  });
}

let queries = document.querySelectorAll('#FAQ>div>ul>li');
for (let i = 0; i < queries.length; i++)
{
  queries[i].children[0].addEventListener('click',function ()
  {
    const icon = queries[i].children[0].children[1];
    if (queries[i].children[1].classList.contains('hidden'))
    {
      icon.style['transform'] = 'rotate(-45deg)';
      expand(queries[i]);
    }
    else
    {
      icon.style['transform'] = 'rotate(0deg)';
      collapse(queries[i],[queries[i].children[1]]);
    }
    
    for (let j = 0; j < queries.length; j++)
    {
      const icon = queries[j].children[0].children[1];
      if (i != j)
      {
        icon.style['transform'] = 'rotate(0deg)';
        collapse(queries[j],[queries[j].children[1]]);
      }
    }
  });
}